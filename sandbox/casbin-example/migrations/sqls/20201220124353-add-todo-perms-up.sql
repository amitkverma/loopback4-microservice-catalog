UPDATE main.roles SET permissions = permissions || '{TodoCRUD}'
where role_type in (0,2);
