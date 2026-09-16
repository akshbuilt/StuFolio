import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fdpytmlmumdgipzekkoj.supabase.co";
const supabaseKey = "sb_publishable_oGmlfL_2dv18mslSdPDxIA_8DmPQHpP";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);