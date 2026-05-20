from http.server import BaseHTTPRequestHandler
import json
import sqlite3
import os
from datetime import datetime
from urllib.parse import urlparse, parse_qs

DB_PATH = '/tmp/survey.db'

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute('''CREATE TABLE IF NOT EXISTS responses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL,
        experience TEXT, countries TEXT, countries_other TEXT,
        revenue TEXT, business_type TEXT,
        platforms TEXT, platforms_other TEXT,
        platform_pain TEXT, platform_pain_other TEXT,
        platform_ai_tools TEXT, platform_ai_tools_other TEXT,
        traffic_channels TEXT, creative_hours TEXT,
        competitor_tracking TEXT, competitor_tracking_other TEXT,
        biggest_pains TEXT, biggest_pains_other TEXT,
        willing_to_pay TEXT,
        pain_creative INTEGER, pain_intelligence INTEGER,
        pain_multilingual INTEGER, pain_ad_optimize INTEGER,
        pain_efficiency INTEGER,
        ai_tool_gap TEXT, ai_tool_gap_other TEXT,
        willing_interview TEXT, contact_method TEXT, contact_info TEXT
    )''')
    conn.commit()
    conn.close()

init_db()

def read_file(path):
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    filepath = os.path.join(base, 'public', path)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    return None

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = urlparse(self.path).path

        if path == '/' or path == '/index.html':
            content = read_file('index.html')
            if content:
                self.send_response(200)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self.end_headers()
                self.wfile.write(content.encode())
                return

        if path == '/admin':
            content = read_file('admin.html')
            if content:
                self.send_response(200)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self.end_headers()
                self.wfile.write(content.encode())
                return

        if path == '/style.css':
            content = read_file('style.css')
            if content:
                self.send_response(200)
                self.send_header('Content-Type', 'text/css; charset=utf-8')
                self.end_headers()
                self.wfile.write(content.encode())
                return

        if path == '/api/stats':
            conn = get_db()
            rows = conn.execute('SELECT * FROM responses ORDER BY created_at DESC').fetchall()
            conn.close()
            results = []
            for row in rows:
                r = dict(row)
                for f in ['countries','platforms','platform_ai_tools','traffic_channels','biggest_pains']:
                    r[f] = json.loads(r[f]) if r.get(f) else []
                results.append(r)
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'total': len(results), 'responses': results}, ensure_ascii=False).encode())
            return

        if path == '/api/export':
            conn = get_db()
            rows = conn.execute('SELECT * FROM responses ORDER BY created_at DESC').fetchall()
            conn.close()
            import csv, io
            output = io.StringIO()
            writer = csv.writer(output)
            headers = ['提交时间','入行时间','目标国家','月营收','业务类型','主要平台','平台痛点','平台痛点补充','AI工具','AI工具补充','获客渠道','素材时间','竞品追踪','竞品追踪补充','最大痛点','痛点补充','付费意愿','创意素材','竞品情报','多语言管理','广告优化','运营效率','AI工具不足','AI工具不足补充','愿意访谈','联系方式类型','联系方式']
            writer.writerow(headers)
            for row in rows:
                r = dict(row)
                for f in ['countries','platforms','platform_ai_tools','traffic_channels','biggest_pains']:
                    r[f] = json.loads(r[f]) if r.get(f) else []
                writer.writerow([r['created_at'],r['experience'],'|'.join(r['countries']),r['revenue'],r['business_type'],'|'.join(r['platforms']),r['platform_pain'],r['platform_pain_other'],'|'.join(r['platform_ai_tools']),r['platform_ai_tools_other'],'|'.join(r['traffic_channels']),r['creative_hours'],r['competitor_tracking'],r['competitor_tracking_other'],'|'.join(r['biggest_pains']),r['biggest_pains_other'],r['willing_to_pay'],r['pain_creative'],r['pain_intelligence'],r['pain_multilingual'],r['pain_ad_optimize'],r['pain_efficiency'],r['ai_tool_gap'],r['ai_tool_gap_other'],r['willing_interview'],r['contact_method'],r['contact_info']])
            self.send_response(200)
            self.send_header('Content-Type', 'text/csv; charset=utf-8')
            self.send_header('Content-Disposition', 'attachment; filename=survey_export.csv')
            self.end_headers()
            self.wfile.write(('﻿' + output.getvalue()).encode())
            return

        self.send_response(404)
        self.end_headers()

    def do_POST(self):
        path = urlparse(self.path).path
        if path == '/api/submit':
            length = int(self.headers.get('Content-Length', 0))
            body = json.loads(self.rfile.read(length)) if length else {}
            conn = get_db()
            conn.execute('''INSERT INTO responses (
                created_at, experience, countries, countries_other, revenue, business_type,
                platforms, platforms_other, platform_pain, platform_pain_other,
                platform_ai_tools, platform_ai_tools_other,
                traffic_channels, creative_hours,
                competitor_tracking, competitor_tracking_other,
                biggest_pains, biggest_pains_other, willing_to_pay,
                pain_creative, pain_intelligence, pain_multilingual,
                pain_ad_optimize, pain_efficiency,
                ai_tool_gap, ai_tool_gap_other,
                willing_interview, contact_method, contact_info
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)''', (
                datetime.now().isoformat(),
                body.get('experience'),
                json.dumps(body.get('countries', []), ensure_ascii=False),
                body.get('countries_other'), body.get('revenue'), body.get('business_type'),
                json.dumps(body.get('platforms', []), ensure_ascii=False),
                body.get('platforms_other'), body.get('platform_pain'), body.get('platform_pain_other'),
                json.dumps(body.get('platform_ai_tools', []), ensure_ascii=False),
                body.get('platform_ai_tools_other'),
                json.dumps(body.get('traffic_channels', []), ensure_ascii=False),
                body.get('creative_hours'), body.get('competitor_tracking'), body.get('competitor_tracking_other'),
                json.dumps(body.get('biggest_pains', []), ensure_ascii=False),
                body.get('biggest_pains_other'), body.get('willing_to_pay'),
                body.get('pain_creative'), body.get('pain_intelligence'), body.get('pain_multilingual'),
                body.get('pain_ad_optimize'), body.get('pain_efficiency'),
                body.get('ai_tool_gap'), body.get('ai_tool_gap_other'),
                body.get('willing_interview'), body.get('contact_method'), body.get('contact_info')
            ))
            conn.commit()
            conn.close()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'success': True}).encode())
            return
        self.send_response(404)
        self.end_headers()

    def do_DELETE(self):
        path = urlparse(self.path).path
        conn = get_db()
        if path.startswith('/api/delete/'):
            rid = int(path.split('/')[-1])
            conn.execute('DELETE FROM responses WHERE id = ?', (rid,))
            conn.commit()
            conn.close()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'success': True}).encode())
            return
        if path == '/api/clear':
            conn.execute('DELETE FROM responses')
            conn.commit()
            conn.close()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'success': True}).encode())
            return
        conn.close()
        self.send_response(404)
        self.end_headers()
