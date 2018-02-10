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

CREATE TABLE "user" (
  id serial NOT NULL,
  email TEXT,
  "limit" integer NOT NULL DEFAULT(5),
  password_hash text NOT NULL,
  "2fa_seed" text,
  CONSTRAINT user_pkey PRIMARY KEY (id)
)
WITH (
  OIDS = FALSE
);

CREATE TABLE domain (
  id serial NOT NULL,
  domain text NOT NULL,
  "limit" integer NOT NULL DEFAULT(5),
  user_id integer NOT NULL,
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
  memo text,
  memo_type text,
  signature text,
  rev_signature text,
  CONSTRAINT account_pkey PRIMARY KEY (id),
  CONSTRAINT domain_fkey FOREIGN KEY (domain_id) REFERENCES domain (id) MATCH SIMPLE
)
WITH (
  OIDS = FALSE
);
