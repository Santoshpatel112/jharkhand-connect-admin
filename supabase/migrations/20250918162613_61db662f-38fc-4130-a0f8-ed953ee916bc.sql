-- Create civic_reports table
CREATE TABLE public.civic_reports (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    priority TEXT NOT NULL DEFAULT 'medium',
    location_lat FLOAT,
    location_lng FLOAT,
    address TEXT,
    image_url TEXT,
    audio_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create citizens table  
CREATE TABLE public.citizens (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create report_updates table for tracking status changes
CREATE TABLE public.report_updates (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    report_id UUID NOT NULL REFERENCES public.civic_reports(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    comment TEXT,
    updated_by TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.civic_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.citizens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_updates ENABLE ROW LEVEL SECURITY;

-- Create policies for civic_reports (admins can see all, citizens can see their own)
CREATE POLICY "Admins can view all reports" 
ON public.civic_reports 
FOR SELECT 
USING (true);

CREATE POLICY "Citizens can view their own reports" 
ON public.civic_reports 
FOR SELECT 
USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Citizens can create reports" 
ON public.civic_reports 
FOR INSERT 
WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Admins can update reports" 
ON public.civic_reports 
FOR UPDATE 
USING (true);

-- Create policies for citizens
CREATE POLICY "Users can view their own profile" 
ON public.citizens 
FOR SELECT 
USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.citizens 
FOR INSERT 
WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.citizens 
FOR UPDATE 
USING (auth.jwt() ->> 'sub' = user_id);

-- Create policies for report_updates
CREATE POLICY "Anyone can view report updates" 
ON public.report_updates 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can create report updates" 
ON public.report_updates 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_civic_reports_updated_at
    BEFORE UPDATE ON public.civic_reports
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_citizens_updated_at
    BEFORE UPDATE ON public.citizens
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.civic_reports (user_id, title, description, category, status, priority, address) VALUES
('sample_user_1', 'Broken Street Light', 'Street light not working on Main Street for past 3 days', 'infrastructure', 'pending', 'high', 'Main Street, Ranchi'),
('sample_user_2', 'Pothole on Road', 'Large pothole causing traffic issues', 'roads', 'in_progress', 'medium', 'Station Road, Dhanbad'),
('sample_user_1', 'Water Supply Issue', 'No water supply for 2 days', 'utilities', 'resolved', 'high', 'Gandhi Chowk, Jamshedpur');