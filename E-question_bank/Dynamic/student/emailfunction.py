from django.core.mail import send_mail
import os
from dotenv import load_dotenv
import json
from .models import CourseWork, Students_data
from datetime import datetime

class EmailLogic:
    load_dotenv()
    hostEmail = os.getenv('EMAIL_HOST_ADDRESS')
    
    allTasks = {
        "CTE323": "assignments/pythonTasks.json",
        "COM122": "assignments/internetTasks.json",
        "EED126": "assignments/entrepreneur.json",
        "ICT102": "assignments/vb.json"
    }
    
    def assessmentSubmision(self, data):
        print(data)
        """submit assessment function"""
        subject = 'Result Submission Notification'
        message = f"Dear Admin,\n\nNotification of task submission with the below details\nFull name: {data['firstName']} {data['lastName']}\nRegNo: {data['regNo']}\nCourse Code: {data['courseCode']}\nModule No: {data['moduleNo']}\nModule Title: {data['moduleTitle']}\nSubmission URL: {data['url']}\n\nThank you!"
        from_email = data["email"]
        to_email = [self.hostEmail]
        
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
        from_email = self.hostEmail
        to_email = [data["email"]]
        
        try:
            send_mail(subject, message, from_email, to_email)
            print("Email sent successfully")
            return True
        except Exception as e:
            print(f"An error occurred while sending email: {str(e)}")
            return False
        
    @staticmethod
    def checkActiveStatus(startDate, endDate):
        userDate = datetime.strptime(startDate, '%d/%m/%Y')
        endDate = datetime.strptime(endDate, "%d/%m/%Y")
        presentTime = datetime.now()
        if presentTime >= userDate and presentTime <= endDate:
            return True
  
    def taskNotificationMail(self, *args, **kwargs):
        """Notification to all registered students on active task"""
        emailData = []
        for key, value in self.allTasks.items():
            with open(f'student/{value}', 'r') as file:
                content = json.load(file)
                for keys in content:
                    startdate = content[keys]["startDate"]
                    enddate = content[keys]['endDate']
                    checkForActiveTime = EmailLogic.checkActiveStatus(startdate, enddate)
                    if checkForActiveTime:
                        registered = CourseWork.objects.filter(courseCode=key)
                        for reg in registered:
                            user = Students_data.objects.get(username=reg.student)
                            emailData.append(user.email)
        
        if emailData:
            subject = 'Task Notification'
            message = 'Dear Student,\n\nNotification of task submission with the below details\nYou are hereby notified that your task has been activated. Please ensure that you complete your task and submit same before the expiration date, as the portal will close once the due date passes.\nFor further details, log in to your dashboard\n\nThank you!\nWarm regards!'
            from_email = self.hostEmail
            to_email = emailData
            
            try:
                send_mail(subject, message, from_email, to_email)
                print("Email sent successfully")
                return True
            except Exception as e:
                print(f"An error occurred while sending email: {str(e)}")
                return False

    def refID(self, data):
        """send user ref Number to their mail address"""
        subject = "Ref Number Notification"
        message = f'Dear {data["username"]}\nYour reference number has been generated successfully.\nYou can now have full access to resources and other valuables on the portal\nUsername: {data["username"]}\nRefNumber: {data["ref"]}\n\nThank you!'
        from_email = self.hostEmail
        to_email = [data["email"]]

        try:
            send_mail(subject, message, from_email, to_email)
            print("Email sent successfully")
            return True
        except Exception as e:
            print(f"An error occurred while sending email: {str(e)}")
            return False
    
    def scoreNotification(self, data):
        """send score notification to students"""
        subject = "Score Notification"
        message = f'Dear {data["username"]}\nWe have evaluated your work via the URL link you submitted and have awarded you a score of {data["score"]}% out of 100% based on our assessment criteria.\nShould you have any concerns regarding the assigned mark, please feel free to contact your course lecturer for further clarification.\n\nReviewer\'s Remark:\n{data["remark"]}\n\nYou can now view your score on the portal\n\nThank you!'
        from_email = self.hostEmail
        to_email = [data["email"]]

        try:
            send_mail(subject, message, from_email, to_email)
            print("Email sent successfully")
            return True
        except Exception as e:
            print(f"An error occurred while sending email: {str(e)}")
            return False
        
    def passwordReset(self, data):
        subject = "Password Reset Notification"
        message = f"Dear {data['username']}\nA request for password reset was send to the server, if this was not you, kindly ignore and report same to the this mail address.\nYour reset code is: {data['resetCode']}.\nNote: For security measures, this code will no longer be active in 3 minutes time\n\nThank you!"
        from_email = self.hostEmail
        to_email = [data["email"]]
        try:
            send_mail(subject, message, from_email, to_email)
            print("Email sent successfully")
            return True
        except Exception as e:
            print(f"An error occurred while sending email: {str(e)}")
            return False