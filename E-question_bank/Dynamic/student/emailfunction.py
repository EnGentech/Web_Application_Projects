from django.core.mail import send_mail
import os
from dotenv import load_dotenv

class EmailLogic:
    load_dotenv()
    
    def assessmentSubmision(self, data):
        print(data)
        """submit assessment function"""
        subject = 'Result Submission Notification'
        message = f"Dear Admin,\n\nNotification of task submission with the below details\nFull name: {data['firstName']} {data['lastName']}\nRegNo: {data['regNo']}\nCourse Code: {data['courseCode']}\nModule No: {data['moduleNo']}\nModule Title: {data['moduleTitle']}\nSubmission URL: {data['url']}\n\nThank you!"
        from_email = data["email"]
        to_email = ["hpoly.eportal@gmail.com"]
        
        try:
            send_mail(subject, message, from_email, to_email)
            print("Email sent successfully")
            return True
        except Exception as e:
            print(f"An error occurred while sending email: {str(e)}")
            return False 

    def signUpNotification(self, data):
        """sign up notification function""" 
        subject = 'Account Creation Notification'
        message = f'Dear {data["username"]}\nYour account has been succesfully created, you can now login to your account.\nWe receive the following basic details\nUsername: {data["username"]}\nEmail: {data["email"]}\nFaculty: {data["faculty"]}\nDepartment: {data["department"]}\n\nThank you!'
        from_email = "hpoly.eportal@gmail.com"
        to_email = [data["email"]]
        
        try:
            send_mail(subject, message, from_email, to_email)
            print("Email sent successfully")
            return True
        except Exception as e:
            print(f"An error occurred while sending email: {str(e)}")
            return False
        