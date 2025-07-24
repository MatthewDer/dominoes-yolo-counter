import onnx

model = onnx.load("my_model.onnx")
print(model.metadata_props)