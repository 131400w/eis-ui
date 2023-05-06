export const SQL = {
    select_role_order: "select * from up_roles where name = 'Order'",
    select_role_productor: "select * from up_roles where name = 'Productor'",
    select_up_users_role_links: "select * from up_users_role_links where user_id =? and role_id = ?",
    add_up_users_role_links: "insert into up_users_role_links (user_id,role_id) values(?,?)",
    select_up_users_ym_factory_links: "select * from up_users_ym_factory_links where user_id = ? and ym_factory_id =?",
    add_up_users_ym_factory_links: "insert into up_users_ym_factory_links (user_id,ym_factory_id) values(?,?)",
}