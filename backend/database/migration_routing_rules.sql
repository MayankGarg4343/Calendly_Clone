-- Migration to make user_id nullable in routing_rules table
ALTER TABLE routing_rules ALTER COLUMN user_id DROP NOT NULL;
