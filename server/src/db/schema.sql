/* from Helmuth's the e-mail:
Limits
5 Stellar accounts per domain
5 domains per user
5 Stellar accounts on our domains per user
These limits will be cross-checked against competition

Account:
  Name (name part of name*domain)
  Domain (link to containing Domain entity)
  Account (stellar address starting with 'G')
  Memo (Stellar memo)
  MemoType (Stellar memo type)
  Signature (for the whole record including memo and memo_type_
  RevSignature (only for 'name*domain' and stellar address)

Domain:
  Limit (max number of Stellar accounts)
  domain name (DNS domain name)
  User (link to the containing User entity)

User:
  Limit (max number of Domains)
  Email
  Password-hash
  2FA seed
*/

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (
  OIDS = FALSE
);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE TABLE "user" (
  id serial NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  password_hash text,
  activation_key text,
  "2fa_seed" text,
  "limit" integer NOT NULL DEFAULT 5,
  facebook_id text,
  facebook_token text,
  facebook_name text,
  facebook_email text,
  twitter_id text,
  twitter_token text,
  twitter_displayName text,
  twitter_username text,
  google_id text,
  google_token text,
  google_email text,
  google_name text,
  CONSTRAINT user_pkey PRIMARY KEY (id)
)
WITH (
  OIDS = FALSE
);

CREATE TABLE domain (
  id serial NOT NULL,
  domain text NOT NULL,
  "limit" integer NOT NULL DEFAULT 5,
  user_id integer NOT NULL,
  system boolean NOT NULL DEFAULT false,
  CONSTRAINT domain_pkey PRIMARY KEY (id),
  CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES "user" (id) MATCH SIMPLE
)
WITH (
  OIDS = FALSE
);

CREATE TABLE account (
  id serial NOT NULL,
  account text NOT NULL,
  name text NOT NULL,
  domain_id integer NOT NULL,
  memo text NOT NULL DEFAULT '',
  memo_type text NOT NULL DEFAULT '',
  signature text NOT NULL DEFAULT '',
  user_id integer NOT NULL,
  CONSTRAINT account_pkey PRIMARY KEY (id),
  CONSTRAINT domain_fkey FOREIGN KEY (domain_id) REFERENCES domain (id) MATCH SIMPLE,
  CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES "user" (id) MATCH SIMPLE,
  CONSTRAINT name_domain_unique UNIQUE (name, domain_id)
)
WITH (
  OIDS = FALSE
);
