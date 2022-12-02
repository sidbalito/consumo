//const { createClient } = require("@supabase/supabase-js");
const { createClient } = require("@supabase/supabase-js");
const { supabase } = require("../../../../../.vscode/consumo/componentes/supabaseClient");

//import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = 'https://rwnzuvbjnsgurupmuehb.supabase.co';
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bnp1dmJqbnNndXJ1cG11ZWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkxMjg3MTgsImV4cCI6MTk4NDcwNDcxOH0.rrqxbuOdxn2nYXGyUWUIKtZakYsF2FmIhBSHT9xLqi4";
//const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

module.exports.dados = function () {
        return {
            consulta(inicio, fim){
                return  supabase.from("consumo").select().gte('created_at', inicio).lte('created_at', fim);
            },
            adicionar(objeto){
                return supabase.from("consumo").insert(objeto);
            },
            async datas(){
                const primeiro = (await supabase.from("consumo").select('created_at').order('created_at', {ascending: true}).limit(1)).data[0].created_at
                const ultimo = (await supabase.from("consumo").select('created_at').order('created_at', {ascending: false}).limit(1)).data[0].created_at
                return {primeiro, ultimo}
            }
        } 
    }
