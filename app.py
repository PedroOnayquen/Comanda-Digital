from flask import Flask, render_template, request, redirect, url_for, flash
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Length, EqualTo
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.secret_key = 'poppdo'  # Troque por uma chave secreta forte

bcrypt = Bcrypt()

# Lista de usuários em memória (neste exemplo, apenas um usuário de demonstração)
users = [{'username': 'demo', 'password': bcrypt.generate_password_hash('password').decode('utf-8')}]

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

@app.route('/')
def home():
    return 'Página inicial'

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = next((user for user in users if user['username'] == username), None)

        if user and bcrypt.check_password_hash(user['password'], password):
            flash('Login bem-sucedido!', 'success')
            # Implemente o redirecionamento para a página principal após o login
            return redirect(url_for('home'))
        else:
            flash('Credenciais inválidas. Tente novamente.', 'danger')

    return render_template('login.html', form=form)

if __name__ == '__main__':
    app.run(debug=True)
