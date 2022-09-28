conn = new Mongo();
db = conn.getDB("demo-tasks");
db.createUser(
{
    user: "demo",
    pwd: "pass",
    roles: [
        {
            role: "readWrite",
            db: "demo-tasks"
        }
    ]
}
);
