// styles.js

import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  content: {
    marginBottom: 20,
  },
  footer: {
    textAlign: 'center',
  },
});
