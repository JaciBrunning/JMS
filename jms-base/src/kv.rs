use std::sync::Arc;

pub use redis::*;
pub use redis_macros::Json;
use tokio::sync::RwLock;

#[derive(Clone)]
pub struct KVConnection {
  redis: Arc<RwLock<redis::aio::Connection>>
}

impl KVConnection {
  pub async fn new() -> anyhow::Result<Self> {
    let redis_uri = std::env::var("REDIS_URI").unwrap_or("redis://localhost:6379/0".to_owned());
    let redis_client = redis::Client::open(redis_uri)?;
    let redis_connection = redis_client.get_async_connection().await?;

    Ok(Self {
      redis: Arc::new(RwLock::new(redis_connection))
    })
  }

  pub async fn expire(&self, key: &str, seconds: usize) -> anyhow::Result<()> {
    self.redis.write().await.expire(key, seconds).await?;
    Ok(())
  }

  pub async fn json_set<V: serde::Serialize + Send + Sync>(&self, key: &str, path: &str, value: &V) -> anyhow::Result<()> {
    self.redis.write().await.json_set(key, path, value).await?;
    Ok(())
  }

  pub async fn json_get<V: serde::de::DeserializeOwned>(&self, key: &str, path: &str) -> anyhow::Result<V> {
    let Json(us): Json<V> = self.redis.write().await.json_get(key, path).await?;
    Ok(us)
  }

  pub async fn hset<V: ToRedisArgs + Send + Sync>(&self, key: &str, field: &str, value: V) -> anyhow::Result<()> {
    self.redis.write().await.hset(key, field, value).await?;
    Ok(())
  }

  pub async fn hget<RV: FromRedisValue>(&self, key: &str, field: &str) -> anyhow::Result<RV> {
    Ok(self.redis.write().await.hget(key, field).await?)
  }

  pub async fn del(&self, key: &str) -> anyhow::Result<()> {
    self.redis.write().await.del(key).await?;
    Ok(())
  }

  pub async fn keys(&self, pattern: &str) -> anyhow::Result<Vec<String>> {
    Ok(self.redis.write().await.keys(pattern).await?)
  }
}