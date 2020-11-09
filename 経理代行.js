/*毎月定例のスケジュールをまとめて登録するプログラム*/
/*入力ダイアログで月を指定して１月分ずつPOSTする*/
/*西暦は識別しないので、年を越す時に32行目を変更する必要がある*/

(function() {
    "use strict";

    kintone.events.on('app.record.index.show',function(event) {

        if (document.getElementById('my_index_button2') !== null) {
            return;
        }

        var myIndexButton2 = document.createElement('button');
        myIndexButton2.id = 'my_index_button2';
        myIndexButton2.innerText = '予定登録';
        myIndexButton2.setAttribute('class','kintoneplugin-button-normal');
        kintone.app.getHeaderMenuSpaceElement().appendChild(myIndexButton2);

            // ボタンクリック時の処理
        myIndexButton2.onclick = function() {
            var Month = prompt('入力したいのは何月分ですか？');
            //桁を２に統一
            Month = ('00' + Month).slice(-2);

            //年度の変更が必要
            var year = 2020;
        
            var momth = String(year) + '-' + String(Month) + '-';

            var weekly_1 = momth + '01';
            var weekly_2 = momth + '02';
            var weekly_3 = momth + '03';
            var weekly_4 = momth + '04';
            var weekly_5 = momth + '05';
            var weekly_6 = momth + '06';
            var weekly_7 = momth + '07';
            var monday;

            //第一月曜日を求める
            if(moment(weekly_1).format('ddd') === 'Mon') {
                monday = weekly_1;
                var five = 1;       //5回月曜ある
            } else if(moment(weekly_2).format('ddd') === 'Mon') {
                monday = weekly_2;
                var five = 1;       //5回月曜ある
            } else if(moment(weekly_3).format('ddd') === 'Mon') {
                monday = weekly_3;
                var five = 1;       //5回月曜ある
            } else if(moment(weekly_4).format('ddd') === 'Mon') {
                monday = weekly_4;
                var five = 0;
            } else if(moment(weekly_5).format('ddd') === 'Mon') {
                monday = weekly_5;
                var five = 0;
            } else if(moment(weekly_6).format('ddd') === 'Mon') {
                monday = weekly_6;
                var five = 0;
            } else if(moment(weekly_7).format('ddd') === 'Mon') {
                monday = weekly_7;
                var five = 0;
            }

            var body = {
                "app" : appID,
                "records" : [
                {
                    "開始日" : {
                        "value" :  momth + '8'
                    },
                    "日付" : {
                        "value" : momth + '11' 
                    },
                    "終了日": {
                        "value": momth + '10'
                    },
                    "氏名": {
                        "value" : [
                            {
                                "code": 'usercode'
                            }
                        ]
                    },
                    "確認事項": {
                        "value" : "e-Tax(源泉所得税納付)"
                    },
                    "処理状況": {
                        "value" : "オレンジ"
                    }
                },{
                    "開始日" : {

                        "value" :  monday
                    },
                    "日付" : {
                        "value" : moment(monday).add(1, 'days').format('YYYY-MM-DD')
                    },
                    "終了日":{
                        "value": monday
                    },
                    "氏名": {
                        "value" : [
                                {
                                "code": 'usercode'
                                }
                            ]
                        },
                    "確認事項": {
                        "value" : '入出金明細書OP'
                    },
                    "処理状況": {
                        "value" : "黄緑"
                    }
                }//登録したいレコードの数だけ追加
                ]
            };

            kintone.api(kintone.api.url('/k/v1/records', true), 'POST', body, function(resp) {
                // success
                console.log(resp);
                swal({
                    title: '登録しました。'
                });
            }, function(error) {
                // error
                console.log(error);
            });

            //月曜日が5回ある月の場合
            if(five === 1) {

                var body_1 = {
                    "app" : appID,
                    "records" : [
                    {
                        "開始日" : {
                            "value" :  moment(monday).add(28,'d').format('YYYY-MM-DD')
                        },
                        "日付" : {
                            "value" : moment(monday).add(29,'d').format('YYYY-MM-DD')
                        },
                        "終了日" : {
                            "value" : moment(monday).add(28,'d').format('YYYY-MM-DD')
                        },
                        "氏名": {
                            "value" : [
                                {
                                "code": 'usercode'
                                }
                            ]
                        },
                        "確認事項": {
                            "value" : 'メールPDF'
                        },
                        "処理状況": {
                            "value" : "黄緑"
                        }
                    },{
                        "開始日" : {
                            "value" :  moment(monday).add(28,'d').format('YYYY-MM-DD')
                        },
                        "日付" : {
                            "value" : moment(monday).add(29,'d').format('YYYY-MM-DD') 
                        },
                        "終了日" : {
                            "value" : moment(monday).add(28,'d').format('YYYY-MM-DD')
                        },
                        "氏名": {
                            "value" : [
                                {
                                "code": 'usercode'
                                }
                            ]
                        },
                        "確認事項": {
                            "value" : '入出金明細書OP'
                        },
                        "処理状況": {
                            "value" : "黄緑"
                        }
                    }
                    ]
                }

                kintone.api(kintone.api.url('/k/v1/records', true), 'POST', body_1, function(res) {
                    console.log(res);
                    swal({
                        title: '登録しました。'
                    });
                }, function(error) {
                    console.log(error);
                });
            }

            //賞与のある月
            if(Month === '07' || Month === '12') {

                var body_2 = {
                    "app" : appID,
                    "records" : [
                    {
                        "開始日" : {
                            "value" :  momth + '1'
                        },
                        "日付" : {
                            "value" : momth + '2' 
                        },
                        "終了日" : {
                            "value" : momth + '1' 
                        },
                        "氏名":{
                            "value" : [
                                {
                                "code": 'usercode'
                                }
                            ]
                        },
                        "確認事項": {
                            "value" : "賞与計算"
                        },
                        "処理状況": {
                            "value" : "黄"
                        }
                    },{
                        "開始日" : {
                            "value" :  momth + '1'
                        },
                        "日付" : {
                            "value" : momth + '2' 
                        },
                        "終了日" : {
                            "value" : momth + '1' 
                        },
                        "氏名": {
                            "value" : [
                                {
                                "code": 'usercode'
                                }
                            ]
                        },
                        "確認事項": {
                            "value" : "メール(賞与)"
                        },
                        "処理状況": {
                            "value" : "黄"
                        }
                    }
                    ]
                }

                kintone.api(kintone.api.url('/k/v1/records', true), 'POST', body_2, function(ress) {
                    // success
                    console.log(ress);
                    swal({
                        title: '登録しました。'
                    });
                }, function(error) {
                    // error
                    console.log(error);
                });
            }

            return event;
        }
    });
})();
