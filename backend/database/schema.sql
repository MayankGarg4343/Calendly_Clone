-- Create database (run this separately if needed)
-- CREATE DATABASE calendly_clone;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    timezone VARCHAR(50) DEFAULT 'UTC',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Event types table
CREATE TABLE IF NOT EXISTS event_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL, -- in minutes
    color VARCHAR(7) DEFAULT '#006BFF',
    location VARCHAR(20) NOT NULL CHECK (location IN ('inPerson', 'phoneCall', 'videoCall')),
    is_active BOOLEAN DEFAULT true,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Availability table
CREATE TABLE IF NOT EXISTS availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Sunday, 6 = Saturday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, day_of_week)
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type_id UUID NOT NULL REFERENCES event_types(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    notes TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'cancelled', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_event_types_user_id ON event_types(user_id);
CREATE INDEX IF NOT EXISTS idx_availability_user_id ON availability(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_event_type_id ON bookings(event_type_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_types_updated_at BEFORE UPDATE ON event_types
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_availability_updated_at BEFORE UPDATE ON availability
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert a default user (for demo purposes)
-- Password is 'admin123' hashed with bcrypt
INSERT INTO users (name, email, password_hash, timezone) 
VALUES (
    'Admin User',
    'admin@calendlyclone.com',
    '$2a$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjQjQjQjQjQjQjQjQ',
    'America/New_York'
) ON CONFLICT (email) DO NOTHING;

-- Insert sample event types
INSERT INTO event_types (name, description, duration, color, location, user_id) 
VALUES 
    ('30 Minute Meeting', 'A quick 30-minute meeting to discuss your project', 30, '#006BFF', 'videoCall', (SELECT id FROM users WHERE email = 'admin@calendlyclone.com')),
    ('60 Minute Consultation', 'A comprehensive 60-minute consultation session', 60, '#10B981', 'videoCall', (SELECT id FROM users WHERE email = 'admin@calendlyclone.com')),
    ('15 Minute Quick Call', 'A brief 15-minute call for quick questions', 15, '#F59E0B', 'phoneCall', (SELECT id FROM users WHERE email = 'admin@calendlyclone.com'))
ON CONFLICT DO NOTHING;

-- Insert default availability (Monday-Friday, 9AM-5PM)
INSERT INTO availability (user_id, day_of_week, start_time, end_time, is_active)
SELECT 
    (SELECT id FROM users WHERE email = 'admin@calendlyclone.com'),
    day_of_week,
    '09:00',
    '17:00',
    true
FROM generate_series(1, 5) AS day_of_week
ON CONFLICT (user_id, day_of_week) DO NOTHING;

-- Integrations table
CREATE TABLE IF NOT EXISTS integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    is_connected BOOLEAN DEFAULT false,
    color VARCHAR(7) DEFAULT '#006BFF',
    features TEXT[],
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample integrations
INSERT INTO integrations (name, description, category, icon, is_connected, color, features, user_id)
VALUES 
    ('Google Calendar', 'Sync your meetings with Google Calendar', 'Calendar', 'google', true, '#4285F4', ARRAY['Two-way sync', 'Real-time updates', 'Multiple calendars'], (SELECT id FROM users WHERE email = 'admin@calendlyclone.com')),
    ('Microsoft Outlook', 'Connect with Microsoft Outlook Calendar', 'Calendar', 'microsoft', false, '#00A4EF', ARRAY['Calendar sync', 'Meeting invites', 'Event updates'], (SELECT id FROM users WHERE email = 'admin@calendlyclone.com')),
    ('Zoom', 'Generate Zoom meeting links automatically', 'Video', 'zoom', true, '#2D8CFF', ARRAY['Auto-generated links', 'Meeting settings', 'Recording options'], (SELECT id FROM users WHERE email = 'admin@calendlyclone.com')),
    ('Slack', 'Get notifications in Slack channels', 'Communication', 'slack', true, '#E01E5A', ARRAY['Channel notifications', 'DM alerts', 'Custom messages'], (SELECT id FROM users WHERE email = 'admin@calendlyclone.com')),
    ('HubSpot', 'Sync contacts with HubSpot CRM', 'CRM', 'hubspot', true, '#FF7A59', ARRAY['Contact sync', 'Deal tracking', 'Activity logging'], (SELECT id FROM users WHERE email = 'admin@calendlyclone.com')),
    ('Salesforce', 'Connect with Salesforce CRM', 'CRM', 'salesforce', false, '#00A1E0', ARRAY['Lead capture', 'Contact management', 'Opportunity tracking'], (SELECT id FROM users WHERE email = 'admin@calendlyclone.com')),
    ('Stripe', 'Process payments for paid meetings', 'Payment', 'stripe', false, '#635BFF', ARRAY['Payment processing', 'Refunds', 'Subscription management'], (SELECT id FROM users WHERE email = 'admin@calendlyclone.com')),
    ('PayPal', 'Accept PayPal payments', 'Payment', 'paypal', false, '#003087', ARRAY['PayPal checkout', 'Invoice payments', 'Recurring billing'], (SELECT id FROM users WHERE email = 'admin@calendlyclone.com')),
    ('Zapier', 'Connect with 3000+ apps via Zapier', 'Automation', 'zapier', true, '#FF4F00', ARRAY['3000+ apps', 'Custom workflows', 'Real-time triggers'], (SELECT id FROM users WHERE email = 'admin@calendlyclone.com')),
    ('Make (Integromat)', 'Visual automation platform', 'Automation', 'make', false, '#6B46C1', ARRAY['Visual builder', 'Advanced logic', 'Multi-step workflows'], (SELECT id FROM users WHERE email = 'admin@calendlyclone.com'))
ON CONFLICT DO NOTHING;

-- Create trigger for integrations updated_at
CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON integrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Routing rules table
CREATE TABLE IF NOT EXISTS routing_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    conditions JSONB DEFAULT '[]'::jsonb,
    actions JSONB DEFAULT '[]'::jsonb,
    priority INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_run TIMESTAMP WITH TIME ZONE,
    total_runs INTEGER DEFAULT 0,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Routing questions table
CREATE TABLE IF NOT EXISTS routing_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    routing_rule_id UUID NOT NULL REFERENCES routing_rules(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'text',
    required BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for routing rules
CREATE INDEX IF NOT EXISTS idx_routing_rules_user_id ON routing_rules(user_id);
CREATE INDEX IF NOT EXISTS idx_routing_rules_priority ON routing_rules(priority);
CREATE INDEX IF NOT EXISTS idx_routing_questions_rule_id ON routing_questions(routing_rule_id);

-- Create triggers for routing rules updated_at
CREATE TRIGGER update_routing_rules_updated_at BEFORE UPDATE ON routing_rules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_routing_questions_updated_at BEFORE UPDATE ON routing_questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for contacts updated_at (will be created after contacts table exists)
-- Note: This trigger is created in the contacts schema file to avoid dependency issues
