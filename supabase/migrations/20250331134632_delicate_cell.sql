/*
  # Initial Schema Setup for Solshades E-commerce

  1. New Tables
    - products
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - price (numeric)
      - category (text)
      - images (text array)
      - in_stock (boolean)
      - created_at (timestamp)
    
    - wishlists
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - product_id (uuid, references products)
      - created_at (timestamp)

    - orders
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - status (text)
      - total_amount (numeric)
      - created_at (timestamp)

    - order_items
      - id (uuid, primary key)
      - order_id (uuid, references orders)
      - product_id (uuid, references products)
      - quantity (integer)
      - price (numeric)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL CHECK (price >= 0),
  category text NOT NULL,
  images text[] NOT NULL DEFAULT '{}',
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  product_id uuid REFERENCES products NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  total_amount numeric NOT NULL CHECK (total_amount >= 0),
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders NOT NULL,
  product_id uuid REFERENCES products NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  price numeric NOT NULL CHECK (price >= 0)
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can view their wishlists"
  ON wishlists
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their wishlists"
  ON wishlists
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items"
  ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );