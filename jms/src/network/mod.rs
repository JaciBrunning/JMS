pub mod onboard;

use crate::arena::AllianceStation;

use async_trait::async_trait;

pub type NetworkError = Box<dyn std::error::Error + Send + Sync>;
pub type NetworkResult<T> = std::result::Result<T, NetworkError>;

#[async_trait]
pub trait NetworkProvider {
  async fn configure_admin(&self) -> NetworkResult<()>;

  async fn configure_alliances(&self, stations: &[AllianceStation], force_reload: bool) -> NetworkResult<()>;
}
