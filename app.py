from flask import Flask, request, jsonify, render_template,  redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
# from forms import
from models import db, connect_db, Cupcake

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///cupcake_db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.app_context().push()

app.config["SECRET_KEY"] = "key"
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False
debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/api/cupcakes')
def list_cupcakes():
    all_cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=all_cupcakes)