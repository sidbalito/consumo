//const { createClient } = require("@supabase/supabase-js");
const { createClient } = require("@supabase/supabase-js");
const { supabase } = require("./supabaseClient");

//import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = 'https://rwnzuvbjnsgurupmuehb.supabase.co';
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bnp1dmJqbnNndXJ1cG11ZWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkxMjg3MTgsImV4cCI6MTk4NDcwNDcxOH0.rrqxbuOdxn2nYXGyUWUIKtZakYsF2FmIhBSHT9xLqi4";
//const supabase = createClient(PROJECT_URL, PUBLIC_KEY);
const COLUNA_DATA_HORA = 'data_hora'

module.exports.dados = function () {
        return {
            consulta(inicio, fim){
                return  supabase.from("consumo").select().gte(COLUNA_DATA_HORA, inicio).lte(COLUNA_DATA_HORA, fim);
            },
            adicionar(objeto){
                return supabase.from("consumo").insert(objeto);
            },
            async datas(){
                const primeiro = (await supabase.from("consumo").select(COLUNA_DATA_HORA).order(COLUNA_DATA_HORA, {ascending: true}).limit(1)).data[0][COLUNA_DATA_HORA]
                const ultimo = (await supabase.from("consumo").select(COLUNA_DATA_HORA).order(COLUNA_DATA_HORA, {ascending: false}).limit(1)).data[0][COLUNA_DATA_HORA]
                return {primeiro, ultimo}
            }
        } 
    }
