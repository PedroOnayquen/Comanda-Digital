from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

comanda = []  # Lista para armazenar os pedidos
total = 0  # Variável para armazenar o total da comanda

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/adicionar_pedido", methods=["POST"])
def adicionar_pedido():
    global total
    item = request.form["item"]
    quantidade = int(request.form["quantidade"])
    
    # Implemente a lógica para adicionar o pedido à comanda e calcular o total aqui
    
    return jsonify({"mensagem": "Pedido adicionado com sucesso!"})

@app.route("/limpar_comanda", methods=["POST"])
def limpar_comanda():
    global comanda, total
    comanda = []
    total = 0
    return jsonify({"mensagem": "Comanda limpa com sucesso!"})

if __name__ == "__main__":
    app.run(debug=True)
