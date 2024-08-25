CREATE TABLE IF NOT EXISTS carts (
    id TEXT PRIMARY KEY,
    create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data TEXT
);
CREATE TABLE IF NOT EXISTS cart_nfts (
    cart_id TEXT,
    chain TEXT,
    token TEXT,
    identifier TEXT,
    create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data TEXT,
    PRIMARY KEY (cart_id, chain, token, identifier),
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE
);
CREATE INDEX idx_cart_nfts_cart_id_create_time ON cart_nfts (cart_id, create_time);
