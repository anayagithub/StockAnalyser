import os
import io
import urllib.parse  # Built-in, no install needed
import pandas as pd
from dotenv import load_dotenv
from supabase import create_client
from sqlalchemy import create_engine

load_dotenv()

def sync_cloud_storage_to_db():
    # 1. Get raw credentials
    url = os.getenv("VITE_SUPABASE_URL")
    key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    db_url = os.getenv("SUPABASE_DB_URL")
    
    if not db_url:
        print("❌ Error: SUPABASE_DB_URL missing")
        return

    try:
        # 2. FIX: Encode the password part of the URL
        # Format is: postgresql://user:password@host:port/dbname
        prefix, rest = db_url.split("://")
        user_pass, host_port_db = rest.rsplit("@", 1)
        user, password = user_pass.split(":", 1)
        
        # This turns '@' into '%40'
        safe_password = urllib.parse.quote_plus(password)
        
        # Rebuild the safe URL
        safe_db_url = f"{prefix}://{user}:{safe_password}@{host_port_db}"
        
        # --- Rest of your existing logic ---
        supabase = create_client(url, key)
        print("📥 Downloading parquet...")
        response = supabase.storage.from_("stock-data").download("historical/market_data_v1.parquet")
        
        df = pd.read_parquet(io.BytesIO(response))
        print(f"✅ Loaded {len(df)} rows.")

        print("🚀 Syncing to Postgres (with safe password)...")
        engine = create_engine(safe_db_url)
        
        df.to_sql(
            'market_intelligence', 
            engine, 
            if_exists='replace', 
            index=False,
            chunksize=2000 # Increased chunksize for faster upload of large data
        )
        print("🎉 SUCCESS! Your data is now in the Supabase table.")

    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    sync_cloud_storage_to_db()