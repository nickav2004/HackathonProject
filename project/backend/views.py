from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, Material
from .serializers import UserSerializer, MaterialSerializer
from .secrets import api_key
import openai

client = openai.OpenAI(api_key=api_key)

class AddUser(APIView):
    def post(self, request):
        print(request.data)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginUser(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if User.objects.filter(email=email, password=password).exists():
            # Login successful
            # You might want to return a token or user information here
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            # Login failed
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        
class GetMaterials(APIView):
    def get(self,request):
        materials = Material.objects.all()
        serializer = MaterialSerializer(materials, many=True)
        return Response(serializer.data)
    
class GetProjects(APIView):
    def post(self, request):
        materials_data = request.data.get('materials', [])
        selected_materials = [material['name'] for material in materials_data if material.get('selected')]
        
        prompt = (f"Given the following materials generate at most 3 simple hands-on project ideas for an age group ranging from 5-12 years old.  Make sure the directions are clear and concise, yet easy to understand given the age group. Go in depth with build instructions. Materials: {selected_materials}. Give the Entire Respoonse in HTML and put it all in a div Format NO TEXT! Do not include ```html in the beginning")
        
        try:

                completion = client.chat.completions.create(
                    model="gpt-4-0125-preview",
                    messages=[
                        {
                            "role": "system",
                            "content": "you are trying to stimulate lasting interest in and preparation for STEM careers for those under 12 years of age.",
                        },
                        {
                            "role": "user",
                            "content": prompt,
                        },
                    ],
                   
                    
                )
                text = completion.choices[0].message.content
                print(text)
        except:
            return Response({"message": "Error in Request"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"chatResponse": text}, status=status.HTTP_200_OK)