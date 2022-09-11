import {openDatabase} from 'react-native-sqlite-storage';

class Database{
    constructor(){
       this.createTables();
    }

    db=openDatabase({
        name:'anki_test',
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
            `CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT,deckId INTEGER, frontText VARCHAR(200),backText VARCHAR(200),score INTEGER DEFAULT 0);`,
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

    getDecks=(setList)=>{
        this.db.transaction(txn=>{
            txn.executeSql(
                `SELECT * FROM decks ORDER BY id DESC`,
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

    updateScore=(id,score)=>{
        this.db.transaction(txn=>{
            txn.executeSql(
                `UPDATE notes SET score = ${score} WHERE id=${id}`,
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
}
 
export default Database;