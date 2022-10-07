import SQLite from 'react-native-sqlite-storage';

class Database{
    constructor(){
       this.createTables();
    }

    db=SQLite.openDatabase({
        name:'anki_test',
        location: 'default'
    });

    createTables = () => {
        this.db.transaction(txn => {
          txn.executeSql(
            `CREATE TABLE IF NOT EXISTS decks (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(200));`,
            [],
            (sqlTxn, res) => {
                // console.log("decks table created successfully");
            },
            error => {
              console.log("error on creating table " + error.message);
            },
          );
          txn.executeSql(
            `CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT,deckId INTEGER, frontText VARCHAR(200),backText VARCHAR(200),score INTEGER DEFAULT 0,lastStatus VARCHAR(20) DEFAULT 'empty');`,
            [],
            (sqlTxn, res) => {
                // console.log("notes table created successfully");
            },
            error => {
              console.log("error on creating table " + error.message);
            },
          );
        });
    }

    getDecks=(setList,search='')=>{
        this.db.transaction(txn=>{
            txn.executeSql(
                `SELECT d.id,d.title,
                COUNT(case when n.lastStatus='good' then 1 end) AS good,
                COUNT(case when n.lastStatus='easy' then 1 end) AS easy,
                COUNT(case when n.lastStatus='again' then 1 end) AS again
                FROM decks as d
                LEFT join notes as n ON n.deckId=d.id
                WHERE d.title LIKE '%${search}%'
                GROUP BY d.id,d.title ORDER BY d.id DESC`,
                [],
                (sqlTxn,res)=>{
                    // console.log("decks retrieved successfully");
                    let len = res.rows.length;
          
                    if (len > 0) {
                      let results = [];
                      for (let i = 0; i < len; i++) {
                        results.push(res.rows.item(i));
                      }
          
                      setList(results);
                    }
                },
                error=>{
                    console.log(error.message);
                }
            );
        });
    }

    insertDeck = (title) => {
        this.db.transaction(txn=>{
            txn.executeSql(
                `INSERT INTO decks (title) VALUES (?)`,
                [title],
                (sqlTxn,result)=>{
                    // console.log(`${title} added successfully`);
                },
                error=>{
                    console.log(error.message);
                }
            );
        })
    }

    getNotes=(setList,deckId)=>{
        this.db.transaction(txn=>{
            txn.executeSql(
                `SELECT * FROM notes WHERE deckId=${deckId} ORDER BY score ASC`,
                [],
                (sqlTxn,res)=>{
                    // console.log("notes retrieved successfully");
                    let len = res.rows.length;

                    if (len > 0) {
                      let results = [];
                      for (let i = 0; i < len; i++) {
                        results.push(res.rows.item(i));
                      }
          
                      setList(results);
                    }
                    else setList('empty');
                },
                error=>{
                    console.log(error.message);
                }
            );
        });
    }

    getStatusCount=(deckId,status,setCount)=>{
        this.db.transaction(txn=>{
            txn.executeSql(
                `SELECT count(*) as count FROM notes WHERE deckId=${deckId} and lastStatus='${status}' ORDER BY score ASC`,
                [],
                (sqlTxn,res)=>{
                    // console.log("notes retrieved successfully");
                   setCount(res.rows.item(0).count);
                },
                error=>{
                    console.log(error.message);
                }
            );
        });
    }

    insertNote = (deckId,frontText,backText) => {
        this.db.transaction(txn=>{
            txn.executeSql(
                `INSERT INTO notes (deckId,frontText,backText) VALUES (?,?,?)`,
                [deckId,frontText,backText],
                (sqlTxn,result)=>{
                    // console.log(`${frontText} added successfully`);
                },
                error=>{
                    console.log(error.message);
                }
            );
        })
    }

    updateNote = (id,deckId,frontText,backText) => {
        this.db.transaction(txn=>{
            txn.executeSql(
                `Update notes SET deckId='${deckId}',frontText='${frontText}',backText='${backText}' WHERE id=${id}`,
                [],
                (sqlTxn,result)=>{
                    // console.log(`${frontText} added successfully`);
                },
                error=>{
                    console.log(error.message);
                }
            );
        })
    }

    updateScore=(id,score,status)=>{
        this.db.transaction(txn=>{
            txn.executeSql(
                `UPDATE notes SET score = ${score} , lastStatus = '${status}' WHERE id=${id}`,
                [],
                (sql,res)=>{
                    console.log(`score updated to ${score}`);
                },
                error=>{
                    console.log(error.message);
                }
            );
        });
    }

    deleteNote=(id)=>{
        this.db.transaction(txn=>{
            txn.executeSql(
                `DELETE FROM notes WHERE id=${id}`,
                [],
                (sql,res)=>{
                    console.log(`${id} deleted successfully`);
                },
                error=>{
                    console.log(error.message);
                }
            );
        });
    }

    deleteDeck=(id)=>{
        this.db.transaction(txn=>{
            txn.executeSql(
                `DELETE FROM decks WHERE id=${id};DELETE FROM notes WHERE deckId=${id};`,
                [],
                (sql,res)=>{
                    console.log(`${id} deleted successfully`);
                },
                error=>{
                    console.log(error.message);
                }
            );
        });
    }
}
 
export default Database;