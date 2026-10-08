const { onDocumentCreated } = require('firebase-functions/v2/firestore')
const { onRequest } = require('firebase-functions/v2/https')
const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const cors = require('cors')({ origin: true })

initializeApp()

exports.countBooks = onRequest((request, response) => {
  return cors(request, response, async () => {
    try {
      const snapshot = await getFirestore().collection('books').get()
      response.json({ count: snapshot.size })
    } catch (error) {
      console.error('Unable to count books:', error)
      response.status(500).json({ error: 'Unable to count books' })
    }
  })
})

exports.capitalizeBookFields = onDocumentCreated('books/{bookId}', async (event) => {
  const snapshot = event.data

  if (!snapshot) {
    return null
  }

  const book = snapshot.data()
  const uppercaseFields = Object.fromEntries(
    Object.entries(book)
      .filter(([, value]) => typeof value === 'string' && value !== value.toUpperCase())
      .map(([field, value]) => [field, value.toUpperCase()]),
  )

  if (Object.keys(uppercaseFields).length === 0) {
    return null
  }

  return snapshot.ref.update(uppercaseFields)
})
