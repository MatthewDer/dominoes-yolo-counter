from ultralytics import YOLO

#inference with YOLO model without onnx conversion


# results = model('test_images/test_image4.jpeg')

# for result in results:
#     print(result.names)

dominoes_info = {'dominoes_0': 0, 'dominoes_1': 1, 'dominoes_2': 2, 'dominoes_3': 3, 'dominoes_4': 4, 'dominoes_5': 5, 
                  'dominoes_6': 6, 'dominoes_7': 7, 'dominoes_8': 8, 'dominoes_9': 9, 'dominoes_10': 10, 'dominoes_11': 11,
                  'dominoes_12': 12}

model = YOLO('my_model.pt')
#onnx_model = YOLO('my_model.onnx')

results = model(['test_images/test_image1.jpeg', 'test_images/test_image2.jpeg', 'test_images/test_image3.jpeg', 'test_images/test_image4.jpeg'])

for result in results:
   class_counts = {}
   sum = 0
   names = result.names
   #print(type(result.boxes.cls.tolist()))
   for class_id in result.boxes.cls.tolist():
      sum = sum + dominoes_info[names[class_id]]
   print("sum: " + str(sum))
   #print(result.boxes.cls.tolist()[0])

   
   #print(type(names[0]))
   #print(names[0])
   sum = 0
#    for name in names:
#       print(names[name][1])
#    for name, count in names:
#       sum = sum + (count * dominoes_info[name])