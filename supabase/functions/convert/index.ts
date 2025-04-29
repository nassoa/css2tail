import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { convertCssToTailwind } from '../../../lib/converter';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { css } = await req.json();
    
    if (!css) {
      return new Response(
        JSON.stringify({ error: 'CSS input is required' }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

    const tailwindClasses = await convertCssToTailwind(css);
    
    return new Response(
      JSON.stringify({ tailwindClasses }),
      { 
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    console.error('Error converting CSS to Tailwind:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to convert CSS to Tailwind' }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});