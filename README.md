### Installation
```
yarn install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### Initially encrypt password:
securityHelper.encodeRequestValue:
```
encodeRequestValue(rawPassword)
```

### Output for string "Password":
```
U2FsdGVkX1+sVlOyePhU/P73ZCuTBx8EoIBmzWyURhk=
```

### Authorization header
```
Authorization: {{ JWT TOKEN }}
```