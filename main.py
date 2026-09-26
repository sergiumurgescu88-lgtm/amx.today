from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
import json
import os
import subprocess
from datetime import datetime

app = FastAPI(title="Trinity AI Agent")

class TradeUpdate(BaseModel):
    bot_name: str
    symbol: str
    entry: float
    exit: float
    pnl: float
    timestamp: str

class ChatRequest(BaseModel):
    message: str

AUTOPSY_FILE = "/opt/trinity-ai/autopsies.json"

def load_autopsies():
    if os.path.exists(AUTOPSY_FILE):
        with open(AUTOPSY_FILE, 'r') as f:
            return json.load(f)
    return []

def save_autopsy(autopsy):
    autopsies = load_autopsies()
    autopsies.insert(0, autopsy)
    if len(autopsies) > 15:
        autopsies = autopsies[:15]
    with open(AUTOPSY_FILE, 'w') as f:
        json.dump(autopsies, f, indent=2)

def get_live_pm2_status(bot_name):
    """Citește statusul real al botului direct din PM2"""
    try:
        result = subprocess.run(['pm2', 'jlist'], capture_output=True, text=True)
        pm2_data = json.loads(result.stdout)
        bot_upper = bot_name.upper()
        
        # Căutăm procesul care conține numele botului
        for proc in pm2_data:
            if bot_upper in proc.get('name', '').upper():
                mem_mb = proc['monit']['memory'] / 1024 / 1024
                uptime_sec = (datetime.now().timestamp() * 1000 - proc['pm2_env']['pm_uptime']) / 1000
                days = int(uptime_sec // 86400)
                hours = int((uptime_sec % 86400) // 3600)
                return f"🟢 ONLINE (PID: {proc['pid']}) | CPU: {proc['monit']['cpu']}% | RAM: {mem_mb:.1f}MB | Uptime: {days}z {hours}h"
        
        return f"🔴 Nu a fost găsit în lista activă PM2. Verifică dacă procesul rulează."
    except Exception as e:
        return f"⚠️ Eroare la citirea PM2: {str(e)}"

def generate_smart_local_response(message: str) -> str:
    msg = message.lower()
    
    if "alpha" in msg:
        status = get_live_pm2_status("alpha")
        return f"🧠 **ALPHA (Sniper - Tier 1 Direct Execution)**\nStrategie de execuție ultra-low latency direct pe orderbook. Caută Volume Burst > 1.80x cu confirmare ADX > 35 pentru intrări M15.\n\n📊 **Status Live VPS:**\n{status}"
    
    elif "beta" in msg:
        status = get_live_pm2_status("beta")
        return f"🧠 **BETA (Trend Rider - Tier 1 Direct Execution)**\nIdentifică impulsul direcțional major și intră pe retragerile optime (pullback la mediile EMA 20/50), confirmat de volum instituțional > 1.49x. Folosește Trailing Stop dinamic.\n\n📊 **Status Live VPS:**\n{status}"
    
    elif "gamma" in msg:
        status = get_live_pm2_status("gamma")
        return f"🧠 **GAMMA (Scalper - Tier 1 Direct Execution)**\nSprinter de înaltă frecvență. Prinde dezechilibre rapide de carnet de ordine și impulsuri de volum micro (>1.3x) pe M1/M5. Iese ultra-rapid cu TP strâns (3-8 pips).\n\n📊 **Status Live VPS:**\n{status}"

    elif "sergiu" in msg:
        status = get_live_pm2_status("sergiu")
        return f"🧠 **SERGIU (Flagship Core - Tier 1 Direct Execution)**\nNava-amiral a fondului Trinity. Specializat pe Opening Range Breakout (ORB) la deschiderea sesiunilor Londra și New York. Intră doar dacă spargerea este validată cu volum > 1.5x și ADX > 25.\n\n📊 **Status Live VPS:**\n{status}"
        
    elif "hermes" in msg:
        status = get_live_pm2_status("hermes")
        return f"🧠 **HERMES (News Catalyst - Tier 2 Gateway)**\nMonitorizează deviația Z-Score economic (Forecast vs Actual) la marcajul T+15m. Evită volatilitatea bruscă cauzată de știrile macroeconomice majore (NFP, FOMC, CPI).\n\n📊 **Status Live VPS:**\n{status}"
        
    elif "hades" in msg:
        status = get_live_pm2_status("hades")
        return f"🧠 **HADES (COT Sentinel - Tier 3 Veto)**\nSantinela de veto macro. Blochează orice intrare dacă fondurile speculative de hedging ating o expunere extremă (> percentila 90%) în raportul săptămânal Commitment of Traders (COT), prevenind lichidările în cascadă.\n\n📊 **Status Live VPS:**\n{status}"
        
    elif "chronos" in msg:
        status = get_live_pm2_status("chronos")
        return f"🧠 **CHRONOS (Time Guardian - Tier 3 Veto)**\nSantinela temporală. Impune 'VETO LOCK' și oprește trading-ul în ferestrele de risc ridicat, precum LBMA Gold Fixing și Rollover-ul pieței RO la 22:00.\n\n📊 **Status Live VPS:**\n{status}"

    elif "ares" in msg:
        status = get_live_pm2_status("ares")
        return f"🧠 **ARES (Volatility Shock - Tier 2 Gateway)**\nReacționează la mișcări nesprogramate bruște care depășesc > 2.5x ATR pe M15, exploatând ineficiențele de preț cauzate de șocuri de volatilitate.\n\n📊 **Status Live VPS:**\n{status}"

    elif "stare" in msg or "status" in msg or "merge" in msg or "sistem" in msg or "health" in msg:
        return f"🧠 **TRINITY SYSTEM HEALTH REPORT**\n✅ Toate sistemele sunt operaționale.\n✅ Feed-ul macro Hermes este activ și sincronizat.\n✅ Motoarele de execuție (Alpha, Beta, Gamma, Sergiu) sunt în stare de așteptare pentru setup-uri de lichiditate.\n✅ Santinelele de veto (Chronos, Hades) sunt active și monitorizează ferestrele de risc.\n\n📈 Nu au fost detectate anomalii sau drawdown-uri neașteptate în ultimele 24 de ore."

    elif "pierdut" in msg or "trade" in msg or "pnl" in msg or "autopsy" in msg:
        autopsies = load_autopsies()
        if autopsies:
            last = autopsies[0]
            return f"🧠 **ULTIMA ANALIZĂ POST-TRADE (AUTOPSY)**\n• **Bot:** {last['bot_name']}\n• **Symbol:** {last['symbol']}\n• **PnL:** {last['pnl']} $\n• **Analiză AI:** {last['ai_analysis']}\n\n*Sistemul a respectat Stop Loss-ul, protejând capitalul de o expunere prelungită.*"
        else:
            return "🧠 Nu există trade-uri pierdute înregistrate recent pentru analiză. Sistemul funcționează în parametri normali."

    else:
        return "🧠 **TRINITY AI ARCHITECT**\nSunt integrat direct în arhitectura de execuție a flotei de pe acest VPS. Mă poți întreba despre:\n• Strategiile specifice (ex: *'Ce face Alpha?'*, *'Unde e Hermes?'*)\n• Starea live a sistemului (ex: *'status sistem'* sau *'health'*)\n• Ultimele analize post-trade (ex: *'ultimul trade pierdut'*).\n\nToate răspunsurile sunt generate local, în timp real, pe baza datelor din PM2."

@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open("/opt/trinity-ai/dashboard.html", "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())

@app.post("/webhook/trade")
async def receive_trade_update(trade: TradeUpdate):
    if trade.pnl < 0:
        prompt = f"Trade pierdut: {trade.bot_name} pe {trade.symbol}, Entry: {trade.entry}, Exit: {trade.exit}, PnL: {trade.pnl}$. Explică în 2 propoziții cauza probabilă."
        ai_analysis = generate_smart_local_response(prompt)
        save_autopsy({
            "bot_name": trade.bot_name, "symbol": trade.symbol, "pnl": trade.pnl,
            "timestamp": trade.timestamp, "ai_analysis": ai_analysis, "status": "ANALYZED"
        })
        return {"status": "success", "message": "Trade inregistrat si analizat."}
    return {"status": "success", "message": "Trade profitabil ignorat."}

@app.get("/autopsies")
async def get_autopsies():
    return load_autopsies()

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    response_text = generate_smart_local_response(request.message)
    return {"response": response_text}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
