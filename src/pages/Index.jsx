import React, { useState } from 'react';
import { Container, VStack, HStack, Text, Button, Input, Select, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2023-10-01', amount: 200, type: 'Income', category: 'Nike' },
    { id: 2, date: '2023-10-02', amount: 150, type: 'Expense', category: 'Adidas' },
  ]);

  const [form, setForm] = useState({ date: '', amount: '', type: '', category: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddTransaction = () => {
    if (isEditing) {
      setTransactions(transactions.map(transaction => transaction.id === editId ? { ...transaction, ...form } : transaction));
      setIsEditing(false);
      setEditId(null);
    } else {
      setTransactions([...transactions, { ...form, id: transactions.length + 1 }]);
    }
    setForm({ date: '', amount: '', type: '', category: '' });
  };

  const handleEditTransaction = (id) => {
    const transaction = transactions.find(transaction => transaction.id === id);
    setForm(transaction);
    setIsEditing(true);
    setEditId(id);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">スニーカー会計アプリ</Text>
        <HStack spacing={4} width="100%">
          <Input placeholder="日付" name="date" value={form.date} onChange={handleChange} />
          <Input placeholder="金額" name="amount" value={form.amount} onChange={handleChange} />
          <Select placeholder="タイプ" name="type" value={form.type} onChange={handleChange}>
            <option value="Income">収入</option>
            <option value="Expense">支出</option>
          </Select>
          <Select placeholder="カテゴリー" name="category" value={form.category} onChange={handleChange}>
            <option value="Nike">ナイキ</option>
            <option value="Adidas">アディダス</option>
            <option value="Puma">プーマ</option>
            <option value="Reebok">リーボック</option>
          </Select>
          <Button onClick={handleAddTransaction}>{isEditing ? '更新' : '追加'}</Button>
        </HStack>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>日付</Th>
              <Th>金額</Th>
              <Th>タイプ</Th>
              <Th>カテゴリー</Th>
              <Th>アクション</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map(transaction => (
              <Tr key={transaction.id}>
                <Td>{transaction.date}</Td>
                <Td>{transaction.amount}</Td>
                <Td>{transaction.type}</Td>
                <Td>{transaction.category}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton icon={<FaEdit />} onClick={() => handleEditTransaction(transaction.id)} />
                    <IconButton icon={<FaTrash />} onClick={() => handleDeleteTransaction(transaction.id)} />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;