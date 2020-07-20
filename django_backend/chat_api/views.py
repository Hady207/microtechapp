from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from .serializers import ItemSerializer, CustomerSerializer, UserSerializer, MessageSerializer
from .models import Item, Customer, Message
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# Create your views here.


@csrf_exempt
def Items(request):
    """
    List all items, or create a new item.
    """

    if request.method == 'GET':
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def ItemOne(request, pk):
    try:
        item = Item.objects.get(pk=pk)
    except Item.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = ItemSerializer(item)
        return JsonResponse(serializer.data)


@csrf_exempt
def CustomersOnItem(request, itemId):
    try:
        cust = Customer.objects.filter(item=itemId)

    except Customer.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = CustomerSerializer(cust, many=True)

        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def Customers(request):
    if request.method == 'GET':
        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers, many=True)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def CustomerOne(request, pk):
    if request.method == 'GET':
        customer = Customer.objects.get(user=pk)
        serializer = UserSerializer(customer.user)
        return JsonResponse(serializer.data)


@csrf_exempt
def Login(request):

    if request.method == 'POST':
        data = JSONParser().parse(request)
        # User.objects.get(username=data['username'])
        user = authenticate(
            username=data['username'], password=data['password'])
        print(f'---------------{user}')

    if user is not None:
        # A backend authenticated the credentials
        User.objects.get(username=user)
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)
    else:
        # No backend authenticated the credentials
        return JsonResponse('incorrect username or password', status=400)


@csrf_exempt
def addToEnquires(request, itemId, userId):
    try:
        item = Item.objects.get(pk=itemId)
        customer = Customer.objects.get(user=userId)
    except Item.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        item.enquiries.add(customer)
        item.save()
        serializer = ItemSerializer(item)
        return JsonResponse(serializer.data)


@csrf_exempt
def Messages(request, itemId, userId, messageId):
    item = Item.objects.get(pk=itemId)
    customer = Customer.objects.get(pk=userId)
    print(f'--------Customer{customer}')
    message = Message.objects.get(item=item, author=customer)
    print(f'--------Message{message}')

    if request.method == 'GET':
        serializers = MessageSerializer(message, many=True)
        return JsonResponse(serializers.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        print(data['message'])
