import pymongo
import smtplib
from email.mime.text import MIMEText

# Connect to Atlas database
client = pymongo.MongoClient("mongodb+srv://mohnish:1234@cluster0.xmogdes.mongodb.net/mydb")
db = client["Group Project"]
users = db["user"]

# Get user's email from database based on registration info
user = users.find_one({"username": "<user-username>"})
email = user["email"]

# Generate confirmation email
msg = MIMEText("Dear {}, thank you for registering on our website. Please click the following link to confirm your account: <confirmation-link>".format(user["name"]))
msg["Subject"] = "Confirmation email"
msg["From"] = ""
msg["To"] = email

# Send confirmation email using SMTP server
smtp_server = "sandbox.smtp.mailtrap.io"
smtp_port = 2525
smtp_username = "45371f13474374"        #dummy username and password for now for security reasons
smtp_password = "68b1edf4e46415"

with smtplib.SMTP(smtp_server, smtp_port) as smtp:
    smtp.starttls()
    smtp.login(smtp_username, smtp_password)
    smtp.send_message(msg)
