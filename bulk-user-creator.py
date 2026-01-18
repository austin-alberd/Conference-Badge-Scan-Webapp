# DANGER ZONE SCRIPT. Can Accidently DDOS your service or create alot of BS users if used incorrectly. YOU HAVE BEEN WARNED
# users.csv should use the following headers. username,password,troop,email,firstName,userPointValue
import requests
import csv

url = "http://localhost:3000/user"
csv_filename = "testUsers.csv"


with open(csv_filename, mode = 'r') as file:
    csv_file = csv.reader(file)
    #['user01', 'TrailPass123!', 'T101B', 'user01@example.com', 'Alice', '10']
    for line in csv_file:
        payload = {'username':line[0],'password':line[1],"troop":line[2],"email":line[3],"firstName":line[4],"userPointValue":int(line[5])}

        response = requests.post(url,json=payload)

        if response.status_code == 201:
            print(f'Successfully Added {line[0]} | {line[4]}')
        else:
            print(f'Failed To Add User {line[0]} | {line[4]}')
            print(response)