# Supabase Setup

This directory contains the database migrations and seed data for the Supabase project.

## Setup Instructions

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project or select your existing project
3. Go to the SQL Editor
4. Run the migration file `20240320000000_create_donations.sql`
5. Run the seed file `seed.sql` to populate the table with sample data

## Table Structure

The `donations` table has the following structure:

- `id`: UUID (Primary Key)
- `name`: TEXT (Donor's name)
- `amount`: DECIMAL(10,2) (Donation amount)
- `created_at`: TIMESTAMP WITH TIME ZONE (Creation timestamp)
- `updated_at`: TIMESTAMP WITH TIME ZONE (Last update timestamp)

## Security Policies

- Anonymous users can read all donations
- Authenticated users can insert new donations
- Row Level Security (RLS) is enabled

## Indexes

- `donations_created_at_idx`: For faster queries by creation date
- `donations_amount_idx`: For faster queries by amount 