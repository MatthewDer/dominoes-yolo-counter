from ultralytics import YOLO

model = YOLO('my_model.pt')

model.export(format='onnx')

onnx_model =YOLO('my_model.onnx')

results = onnx_model('test_images/test_image1.jpeg')