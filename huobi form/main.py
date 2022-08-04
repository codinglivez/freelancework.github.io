from flask import Flask, request, jsonify, render_template
import pandas as pd
import os

app = Flask(__name__)

all_sp_acc_path = "AccountData/All_sp_accounts.csv"
all_fu_acc_path = "AccountData/All_fu_accounts.csv"
acc_folder = "AccountData/"
coins_folder = "CoinsData/"

@app.route('/')
def main_page():
    if not os.path.exists(acc_folder[:-1]):
        os.mkdir(acc_folder[:-1])
    if not os.path.exists(coins_folder[:-1]):
        os.mkdir(coins_folder[:-1])

    if not os.path.exists(all_fu_acc_path):
        pd.DataFrame(["acc_name"]).to_csv(all_fu_acc_path, index=False, header=False)
    if not os.path.exists(all_sp_acc_path):
        pd.DataFrame(["acc_name"]).to_csv(all_sp_acc_path, index=False, header=False)
    
    return render_template('index.html')

@app.route('/load_all_sp_acc', methods=['GET', 'POST'])
def load_all_sp_acc():
    try:
        df = pd.read_csv(all_sp_acc_path).values.tolist()
    except:
        return jsonify(dict(data=[["No Account"]]))

    if df:
        return jsonify(dict(data=df))
    else:
        return jsonify(dict(data=[["No Account"]]))


@app.route('/load_all_fu_acc', methods=['GET', 'POST'])
def load_all_fu_acc():
    try:
        df = pd.read_csv(all_fu_acc_path).values.tolist()
    except:
        return jsonify(dict(data=[["No Account"]]))
    
    if df:
        return jsonify(dict(data=df))
    else:
        return jsonify(dict(data=[["No Account"]]))


@app.route('/load_sp_acc_coins', methods=['GET', 'POST'])
def load_sp_acc_coins():
    data_params = request.get_json()
    acc_name = data_params["main_acc_name"]
    print(acc_name)
    try:
        df = pd.read_csv(coins_folder + f"{acc_name}_sp_coins.csv", usecols=["Symbol", "Investment", "Side"]).values.tolist()
    except:
        return jsonify(dict(error="No Coins"))
    if df:
        return jsonify(dict(data=df))
    else:
        
        return jsonify(dict(error="No Coins"))


@app.route('/load_fu_acc_coins', methods=['GET', 'POST'])
def load_fu_acc_coins():
    data_params = request.get_json()
    acc_name = data_params["main_acc_name"]
    try:
        df = pd.read_csv(coins_folder + f"{acc_name}_fu_coins.csv", usecols=["Symbol", "Investment", "Side"]).values.tolist()
    except:
        return jsonify(dict(error="No Coins"))
    # print(df)
    if df:
        return jsonify(dict(data=df))
    else:
        return jsonify(dict(error="No Coins"))

@app.route('/add_main_acc', methods=['GET', 'POST'])
def add_main_acc():
    data = request.get_json()
    main_acc_name = data['main_acc_name']
    main_api_key = data['main_api_key']
    main_api_secret = data['main_api_secret']
    acc_type = data['acc_type']
    if main_acc_name:
        if acc_type == 1:
            if os.path.exists(acc_folder + f"{main_acc_name}_fu_acc_data.csv"):
                if ((pd.read_csv(all_fu_acc_path)["acc_name"] == main_acc_name).sum()) == 0:
                    if ((pd.read_csv(acc_folder + f"{main_acc_name}_fu_acc_data.csv")["api_key"] == main_acc_name).sum()) == 0:

                        temp = [main_acc_name]
                        df = pd.DataFrame(temp)
                        df.to_csv(all_fu_acc_path, mode='a+', index=False, header=False)

                        temp2 = [[main_api_key, main_api_secret]]
                        df2 = pd.DataFrame(temp2)
                        df2.to_csv(acc_folder + f"{main_acc_name}_fu_acc_data.csv", mode='w+', index=False, header=['api_key', 'api_secret'])
                    else:
                        return jsonify(dict(error="Same api key error"))
                else:
                    return jsonify(dict(error="Same acc name error"))
            else:
                if ((pd.read_csv(all_fu_acc_path)["acc_name"] == main_acc_name).sum()) == 0:
                    temp = [main_acc_name]
                    df = pd.DataFrame(temp)
                    df.to_csv(all_fu_acc_path, mode='a+', index=False, header=False)

                    temp2 = [[main_api_key, main_api_secret]]
                    df2 = pd.DataFrame(temp2)
                    df2.to_csv(acc_folder + f"{main_acc_name}_fu_acc_data.csv", mode='w+', index=False, header=['api_key', 'api_secret'])
                else:
                    return jsonify(dict(error="Same acc name error"))
        else:
            if os.path.exists(acc_folder + f"{main_acc_name}_sp_acc_data.csv"):

                if ((pd.read_csv(all_sp_acc_path)["acc_name"] == main_acc_name).sum()) == 0:
                    if ((pd.read_csv(acc_folder + f"{main_acc_name}_sp_acc_data.csv")["api_key"] == main_acc_name).sum()) == 0:

                        temp = [main_acc_name]
                        df = pd.DataFrame(temp)
                        df.to_csv(all_sp_acc_path, mode='a+', index=False, header=False)

                        temp2 = [[main_api_key, main_api_secret]]
                        df2 = pd.DataFrame(temp2)
                        df2.to_csv(acc_folder + f"{main_acc_name}_sp_acc_data.csv", mode='w+', index=False, header=['api_key', 'api_secret'])
                    else:
                        return jsonify(dict(error="Same api key error"))
                else:
                    return jsonify(dict(error="Same acc name error"))
            else:
                if ((pd.read_csv(all_sp_acc_path)["acc_name"] == main_acc_name).sum()) == 0:
                    temp = [main_acc_name]
                    df = pd.DataFrame(temp)
                    df.to_csv(all_sp_acc_path, mode='a+', index=False, header=False)

                    temp2 = [[main_api_key, main_api_secret]]
                    df2 = pd.DataFrame(temp2)
                    df2.to_csv(acc_folder + f"{main_acc_name}_sp_acc_data.csv", mode='w+', index=False, header=['api_key', 'api_secret'])
                else:
                    return jsonify(dict(error="Same acc name error"))

        return jsonify(dict(success="Success"))
    else:
        return jsonify(dict(error="Error"))

@app.route('/add_sub_acc', methods=['GET', 'POST'])
def add_sub_acc():
    data = request.get_json()
    main_acc_name = data['main_acc_name']
    api_key = data['api_key']
    api_secret = data['api_secret']
    acc_type = data['acc_type']

    if main_acc_name:
        if acc_type == 1:
            if ((pd.read_csv(acc_folder + f"{main_acc_name}_fu_acc_data.csv")["api_key"] == api_key).sum()) == 0:
                temp2 = [[api_key, api_secret]]
                df2 = pd.DataFrame(temp2)
                df2.to_csv(acc_folder + f"{main_acc_name}_fu_acc_data.csv", mode='a+', index=False, header=False)
            else:
                return jsonify(dict(error="Same api key error"))
        else:
            if ((pd.read_csv(acc_folder + f"{main_acc_name}_sp_acc_data.csv")["api_key"] == api_key).sum()) == 0:
                temp2 = [[api_key, api_secret]]
                df2 = pd.DataFrame(temp2)
                df2.to_csv(acc_folder + f"{main_acc_name}_sp_acc_data.csv", mode='a+', index=False, header=False)
            else:
                return jsonify(dict(error="Same api key error"))

        return jsonify(dict(success="Success"))
    else:
        return jsonify(dict(error="Error"))

@app.route('/add_sp_coin', methods=['GET', 'POST'])
def add_sp_coin():
    data = request.get_json()
    main_acc_name = data['main_acc_name']
    sym = data['symbol']
    invest = data['investment']
    lo_lim = data['lo_lim']
    up_lim = data['up_lim']
    entry_lev = data['entry_lev']
    take_pf = data['take_pf']
    symID = main_acc_name.lower() + sym + str(lo_lim).replace(".", "")
    if os.path.exists("DeleteList.txt"):
        temp = []
        with open("DeleteList.txt", 'r+') as f:
            lines = f.readlines()
            for i in lines:
                if symID not in i:
                    temp.append(i)
            f.close()
        with open('DeleteList.txt', 'w+') as f:
            for k in temp:
                f.write(k)
            f.close()

    if main_acc_name and sym and invest and lo_lim and up_lim and entry_lev and take_pf:

        temp2 = [[sym, invest, lo_lim, up_lim, entry_lev, take_pf, symID]]
        df2 = pd.DataFrame(temp2)
        if os.path.exists(f"{coins_folder}{main_acc_name}_sp_coins.csv"):
            df2.to_csv(f"{coins_folder}{main_acc_name}_sp_coins.csv",
                       mode='a+', index=False, header=False)
        else:
            df2.to_csv(f"{coins_folder}{main_acc_name}_sp_coins.csv",
                       mode='w+', index=False, header=['Symbol', 'Investment', 'Lower_lim', 'Upper_lim', 'Entry_lev', 'Take_profit', 'symID'])

        return jsonify(dict(success="Success"))
    else:
        return jsonify(dict(error="Missing Data error"))


@app.route('/add_fu_coin', methods=['GET', 'POST'])
def add_fu_coin():

    data = request.get_json()
    main_acc_name = data['main_acc_name']
    sym = data['symbol']
    invest = data['investment']
    lev = data['leverage']
    lo_lim = data['lo_lim']
    up_lim = data['up_lim']
    entry_lev = data['entry_lev']
    take_pf = data['take_pf']
    symID = main_acc_name.lower() + sym + str(lo_lim).replace(".", "")
    side = 0
    if main_acc_name and sym and invest and lo_lim and up_lim and entry_lev and take_pf and lev:

        if lo_lim > up_lim:
            side = 1

        temp2 = [[sym, invest, lev, lo_lim, up_lim, entry_lev, take_pf, side, symID]]
        df2 = pd.DataFrame(temp2)
        if os.path.exists(f"{coins_folder}{main_acc_name}_fu_coins.csv"):
            df2.to_csv(f"{coins_folder}{main_acc_name}_fu_coins.csv",
                       mode='a+', index=False, header=False)
        else:
            df2.to_csv(f"{coins_folder}{main_acc_name}_fu_coins.csv",
                       mode='w+', index=False, header=['Symbol', 'Investment', 'Leverage', 'Lower_lim', 'Upper_lim', 'Entry_lev', 'Take_profit', 'Side', 'SymID'])
        return jsonify(dict(success="Success"))
    else:
        return jsonify(dict(error="Missing Data error"))


@app.route('/delete_coin', methods=['GET', 'POST'])
def delete_coin():
    data = request.get_json()
    main_acc_name = data['main_acc_name']
    acc_type = data['acc_type']
    coin_num = int(data['coin_num'])
    if acc_type == 1:
        if os.path.exists(f"{coins_folder}{main_acc_name}_fu_coins.csv"):
            df = pd.read_csv(f"{coins_folder}{main_acc_name}_fu_coins.csv")
            df.drop(coin_num, axis=0, inplace=True)
            df.to_csv(f"{coins_folder}{main_acc_name}_fu_coins.csv", mode='w+', index=False)
        else:
            return jsonify(dict(error="Error"))
    else:
        if os.path.exists(f"{coins_folder}{main_acc_name}_sp_coins.csv"):
            df = pd.read_csv(f"{coins_folder}{main_acc_name}_sp_coins.csv")

            with open("DeleteList.txt", 'a+') as f:
                f.write(df.iloc[coin_num]['SymID'] + "\n")
                f.close()

            df.drop(coin_num, axis=0, inplace=True)
            df.to_csv(f"{coins_folder}{main_acc_name}_sp_coins.csv", mode='w+', index=False)
        else:
            return jsonify(dict(error="Error"))

    return jsonify(dict(success="Success"))


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)


