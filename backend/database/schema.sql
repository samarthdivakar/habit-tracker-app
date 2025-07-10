
-- Create habits table

CREATE TABLE IF NOT EXISTS habits (

    id SERIAL PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



-- Create habit_logs table (tracks daily completions)

CREATE TABLE IF NOT EXISTS habit_logs (

    id SERIAL PRIMARY KEY,

    habit_id INTEGER REFERENCES habits(id) ON DELETE CASCADE,

    completed_date DATE NOT NULL,

    completed BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(habit_id, completed_date)

);



-- Insert sample data

INSERT INTO habits (name, description) VALUES 

('Drink 8 glasses of water', 'Stay hydrated throughout the day'),

('Exercise for 30 minutes', 'Daily physical activity'),

('Read for 20 minutes', 'Daily reading habit')

ON CONFLICT DO NOTHING;

