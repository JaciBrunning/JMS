use std::{
  error::Error,
  sync::{
    atomic::{AtomicBool, Ordering},
    Arc,
  },
};

use log::error;
use serde::{ser::SerializeStruct, Serialize, Serializer};

use crate::{db::{self, TableType}, models::{self, MatchGenerationRecord}};

pub struct MatchGenerationWorker<T>
where
  T: MatchGenerator + Send + Sync + 'static,
  <T as MatchGenerator>::ParamType: Send,
{
  running: Arc<AtomicBool>,
  generator: T,
}

impl<T> MatchGenerationWorker<T>
where
  T: MatchGenerator + Send + Sync + Clone,
  <T as MatchGenerator>::ParamType: Send,
{
  pub fn new(gen: T) -> Self {
    Self {
      running: Arc::new(AtomicBool::new(false)),
      generator: gen,
    }
  }

  pub fn running(&self) -> bool {
    self.running.load(Ordering::Relaxed)
  }

  pub fn match_type(&self) -> models::MatchType {
    self.generator.match_type()
  }

  pub fn record(&self) -> Option<MatchGenerationRecord> {
    MatchGenerationRecord::get(self.match_type(), &db::database()).ok()
  }

  pub fn matches(&self) -> Vec<models::Match> {
    let mut matches = models::Match::by_type(self.match_type(), &db::database()).unwrap();
    matches.sort();
    matches
  }

  pub fn has_played(&self) -> bool {
    self.matches().iter().any(|t| t.played)
  }

  pub fn delete(&self) {
    #[allow(unused_must_use)]
    if let Some(record) = self.record() {
      record.remove(&db::database());
    }

    #[allow(unused_must_use)]
    for m in self.matches() {
      m.remove(&db::database());
    }
  }

  pub async fn generate(&self, params: T::ParamType) {
    let running = self.running.clone();
    let gen = self.generator.clone();
    let record = self.record();
    tokio::spawn(async move {
      // *running.get_mut() = true;
      running.swap(true, Ordering::Relaxed);
      match gen.generate(params, record).await {
        Ok(_) => (),
        Err(e) => error!("Match Generation Error: {}", e),
      }
      // *running.get_mut() = false;
      running.swap(false, Ordering::Relaxed);
    });
  }
}

impl<T> Serialize for MatchGenerationWorker<T>
where
  T: MatchGenerator + Send + Sync + Clone + 'static,
  <T as MatchGenerator>::ParamType: Send,
{
  fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
  where
    S: Serializer,
  {
    let mut state = serializer.serialize_struct("MatchGenerationWorker", 3)?;
    state.serialize_field("running", &self.running())?;
    state.serialize_field("matches", &self.matches().iter().map(|m| models::SerializedMatch(m.clone())).collect::<Vec<models::SerializedMatch>>())?;
    state.serialize_field("record", &self.record())?;
    state.end()
  }
}

#[async_trait::async_trait]
pub trait MatchGenerator {
  type ParamType;

  fn match_type(&self) -> models::MatchType;
  async fn generate(
    &self,
    params: Self::ParamType,
    record: Option<MatchGenerationRecord>,
  ) -> Result<(), Box<dyn Error>>;
}
