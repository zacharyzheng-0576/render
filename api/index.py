from flask import Flask, request, jsonify, send_from_directory, Response
import json
import sqlite3
import os
import csv
import io
from datetime import datetime

app = Flask(__name__)

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

STATIC_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public')

@app.route('/')
def index():
    return send_from_directory(STATIC_DIR, 'index.html')

@app.route('/admin')
def admin():
    return send_from_directory(STATIC_DIR, 'admin.html')

@app.route('/style.css')
def style():
    return send_from_directory(STATIC_DIR, 'style.css')

@app.route('/api/submit', methods=['POST'])
def submit():
    data = request.json
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
        data.get('experience'),
        json.dumps(data.get('countries', []), ensure_ascii=False),
        data.get('countries_other'), data.get('revenue'), data.get('business_type'),
        json.dumps(data.get('platforms', []), ensure_ascii=False),
        data.get('platforms_other'), data.get('platform_pain'), data.get('platform_pain_other'),
        json.dumps(data.get('platform_ai_tools', []), ensure_ascii=False),
        data.get('platform_ai_tools_other'),
        json.dumps(data.get('traffic_channels', []), ensure_ascii=False),
        data.get('creative_hours'), data.get('competitor_tracking'), data.get('competitor_tracking_other'),
        json.dumps(data.get('biggest_pains', []), ensure_ascii=False),
        data.get('biggest_pains_other'), data.get('willing_to_pay'),
        data.get('pain_creative'), data.get('pain_intelligence'), data.get('pain_multilingual'),
        data.get('pain_ad_optimize'), data.get('pain_efficiency'),
        data.get('ai_tool_gap'), data.get('ai_tool_gap_other'),
        data.get('willing_interview'), data.get('contact_method'), data.get('contact_info')
    ))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/stats')
def stats():
    conn = get_db()
    rows = conn.execute('SELECT * FROM responses ORDER BY created_at DESC').fetchall()
    conn.close()
    results = []
    for row in rows:
        r = dict(row)
        for f in ['countries','platforms','platform_ai_tools','traffic_channels','biggest_pains']:
            r[f] = json.loads(r[f]) if r.get(f) else []
        results.append(r)
    return jsonify({'total': len(results), 'responses': results})

@app.route('/api/delete/<int:rid>', methods=['DELETE'])
def delete_one(rid):
    conn = get_db()
    conn.execute('DELETE FROM responses WHERE id = ?', (rid,))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/clear', methods=['DELETE'])
def clear_all():
    conn = get_db()
    conn.execute('DELETE FROM responses')
    conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/export')
def export_csv():
    conn = get_db()
    rows = conn.execute('SELECT * FROM responses ORDER BY created_at DESC').fetchall()
    conn.close()
    output = io.StringIO()
    writer = csv.writer(output)
    headers = ['提交时间','入行时间','目标国家','月营收','业务类型','主要平台','平台痛点','平台痛点补充','AI工具','AI工具补充','获客渠道','素材时间','竞品追踪','竞品追踪补充','最大痛点','痛点补充','付费意愿','创意素材','竞品情报','多语言管理','广告优化','运营效率','AI工具不足','AI工具不足补充','愿意访谈','联系方式类型','联系方式']
    writer.writerow(headers)
    for row in rows:
        r = dict(row)
        for f in ['countries','platforms','platform_ai_tools','traffic_channels','biggest_pains']:
            r[f] = json.loads(r[f]) if r.get(f) else []
        writer.writerow([r['created_at'],r['experience'],'|'.join(r['countries']),r['revenue'],r['business_type'],'|'.join(r['platforms']),r['platform_pain'],r['platform_pain_other'],'|'.join(r['platform_ai_tools']),r['platform_ai_tools_other'],'|'.join(r['traffic_channels']),r['creative_hours'],r['competitor_tracking'],r['competitor_tracking_other'],'|'.join(r['biggest_pains']),r['biggest_pains_other'],r['willing_to_pay'],r['pain_creative'],r['pain_intelligence'],r['pain_multilingual'],r['pain_ad_optimize'],r['pain_efficiency'],r['ai_tool_gap'],r['ai_tool_gap_other'],r['willing_interview'],r['contact_method'],r['contact_info']])
    output.seek(0)
    return Response('﻿' + output.getvalue(), mimetype='text/csv', headers={'Content-Disposition': 'attachment; filename=survey_export.csv'})
