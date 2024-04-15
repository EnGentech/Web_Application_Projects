from django.core.mail import send_mail
import os
from dotenv import load_dotenv

class EmailLogic:
    load_dotenv()

    
    def assessmentSubmision(self, data):
        """submit assessment function"""
        subject = 'Result Submission Notification'
        message = f"Dear Admin,\n\nNotification of task submission with the below details\nFull name: {data['firstName']} {data['lastName']}\nRegNo: {data['regNo']}\nCourse Code: {data['courseCode']}\nModule No: {data['moduleNo']}\nModule Title: {data['moduleTitle']}\nSubmission URL: {data['url']}\n\nThank you!"
        from_email = data['email']
        to_email = [os.environ.get("EMAIL_HOST_ADDRESS")]
        
        send_mail(subject, message, from_email, to_email)
        