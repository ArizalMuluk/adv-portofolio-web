from flask import Flask, render_template, url_for, request, redirect, jsonify, render_template_string
import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
import html

load_dotenv()

app = Flask(__name__)

# --- Konfigurasi Email ---
EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
RECIPIENT_EMAIL = os.getenv('RECIPIENT_EMAIL')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/send-message', methods=['POST'])
def send_message():
    # Periksa kredensial (tetap sama)
    if not all([EMAIL_ADDRESS, EMAIL_PASSWORD, RECIPIENT_EMAIL]):
        print("Error: Konfigurasi email belum lengkap di environment variables.")
        return jsonify({'success': False, 'message': 'Server configuration error.'}), 500

    try:
        # Ambil data JSON (tetap sama)
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')

        # Validasi (tetap sama)
        if not all([name, email, subject, message]):
            return jsonify({'success': False, 'message': 'Missing form data.'}), 400

        # Escape user input (tetap sama)
        name_escaped = html.escape(name)
        email_escaped = html.escape(email)
        subject_escaped = html.escape(subject)
        message_html = html.escape(message).replace('\n', '<br>')

        # --- Baca Template dari File dan Format ---
        try:
            # Tentukan path ke template relatif terhadap app.py
            template_path = os.path.join(os.path.dirname(__file__), 'templates', 'email_template.html')
            with open(template_path, 'r', encoding='utf-8') as f:
                template_string = f.read()

            # Siapkan data untuk dimasukkan ke template
            template_data = {
                "name": name_escaped,
                "email": email_escaped,
                "subject": subject_escaped,
                "message": message_html,
                "reply_link": f"mailto:{email_escaped}" # Buat link mailto
            }
            # Format template dengan data
            email_body_html = render_template_string(template_string, **template_data)

        except FileNotFoundError:
            print(f"Error: Email template file not found at {template_path}")
            return jsonify({'success': False, 'message': 'Server error: Email template missing.'}), 500
        except Exception as e:
            print(f"Error reading or formatting email template: {e}")
            return jsonify({'success': False, 'message': 'Server error processing email template.'}), 500
        # --- Akhir Baca Template ---


        # Buat objek email sebagai HTML (tetap sama)
        msg = MIMEText(email_body_html, 'html')
        msg['Subject'] = f"Portfolio Contact: {subject_escaped}"
        msg['From'] = f"{name_escaped} <{EMAIL_ADDRESS}>"
        msg['To'] = RECIPIENT_EMAIL
        msg['Reply-To'] = email_escaped

        # Kirim email menggunakan SMTP (kode try/except untuk smtplib tetap sama)
        print(f"Attempting to send email via {SMTP_SERVER}:{SMTP_PORT}")
        # ... (kode smtplib.SMTP, server.login, server.sendmail, server.quit) ...
        # Menggunakan 'with' lebih baik di sini jika Anda mau refactor nanti
        try:
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            print("SMTP login successful.")
            server.sendmail(EMAIL_ADDRESS, RECIPIENT_EMAIL, msg.as_string())
            print("Email sent successfully.")
            server.quit()
        except smtplib.SMTPNotSupportedError:
            print("TLS not supported, trying SSL...")
            # Anda mungkin perlu memindahkan blok login/sendmail ke dalam try/except ini juga
            # atau menggunakan 'with' untuk manajemen koneksi yang lebih baik
            server = smtplib.SMTP_SSL(SMTP_SERVER, 465)
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            print("SMTP login successful.")
            server.sendmail(EMAIL_ADDRESS, RECIPIENT_EMAIL, msg.as_string())
            print("Email sent successfully.")
            server.quit()


        return jsonify({'success': True, 'message': 'Message sent successfully!'})

    # Blok except lainnya (tetap sama)
    except smtplib.SMTPAuthenticationError:
        print(f"SMTP Authentication Error: Check email address/password.")
        return jsonify({'success': False, 'message': 'Server error sending email (auth failed).'}), 500
    except smtplib.SMTPConnectError:
        print(f"SMTP Connect Error: Could not connect to {SMTP_SERVER}:{SMTP_PORT}.")
        return jsonify({'success': False, 'message': 'Server error sending email (connection failed).'}), 500
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'success': False, 'message': f'An unexpected server error occurred.'}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

