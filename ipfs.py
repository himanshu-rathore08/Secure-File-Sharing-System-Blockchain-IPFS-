import ipfshttpclient

client = ipfshttpclient.connect("/ip4/127.0.0.1/tcp/5001")

# Upload file to IPFS
def upload_to_ipfs(data):
    res = client.add_bytes(data)
    return res

# Download file from IPFS
def download_from_ipfs(ipfs_hash):
    try:
        data = client.cat(ipfs_hash)
        return data
    except Exception as e:
        print("IPFS ERROR:", e)
        return None