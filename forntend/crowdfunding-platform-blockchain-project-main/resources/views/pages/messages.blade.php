<x-layout>
 
  <div class="chat-container" style="margin-bottom: 100px">
    
    <div class="contacts-section">
      <div class="contacts-header">
        @if (auth()->user()->suspended == "1")
        <button id="contactAdminBtn" style="color:white; padding: 10px 15px; border: none;  border-radius: 3px; background-color: #ff3c00; cursor: pointer;  transition: background-color 0.3s ease;">Contact Admin</button>
        @endif
        



        <div id="contactAdminModal" class="modal">
          <div class="modal-content">
            <span class="close-btn">&times;</span>
            <form action="/issue" method="POST">
              @csrf
              <h2>Contact Admin</h2>
              <label for="reason">Reason:</label>
              <select name="issue_type">
                <option value="account_ban">Account Ban</option>
                <option value="campaign_ban">Campaign Ban</option>
              </select>
              <label for="message">Message:</label>
              <textarea name="description" required></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>






        <h2>Contacts</h2>
      </div>
      <ul class="contact-list">
        <!-- Displaying the contacts here -->
        @foreach($contacts as $contact)
        <li class="contact" data-contact-id="{{ $contact->id }}"> 
          <img src="{{$contact->profile ? asset('storage/' . $contact->profile) : asset('/images/homies.jpg')}}"  alt="">
          {{ $contact->firstname }} {{ $contact->sirname }}</li>
        @endforeach
      </ul>
     
    </div>
    <div class="message-section">
      <div class="message-header">
        <h2>Messages</h2>
      </div>
      <div class="message-list">
        <!-- Displaying the messages here -->
      </div>
      <div class="reply-form">
        
          <textarea name="reply" id="reply"  placeholder="Type your message..." >

        </textarea>
          <button type="submit">Send</button>
       
       
      </div>
    </div>
    
  </div>

  <script>
  const authUserId = "{{ auth()->id() }}";
    let selectedContactId = null;
    const messageList = document.querySelector('.message-list');

    // Function to mark messages as read
    function markMessagesAsRead(contactId) {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); // Get the CSRF token from the meta tag

      // Sending data in a regular JavaScript object
      const data = {
        contact_id: contactId,
      };

      fetch('/mark-messages-as-read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(data), // Stringify the regular JavaScript object
      })
        .then(response => response.json())
        .then(data => {
          console.log('Messages marked as read:', data);
        })
        .catch(error => {
          console.error('Error marking messages as read:', error);
        });
    }

    // Update the fetchMessages function to mark messages as read after displaying them
    function fetchMessages(contactId) {
      fetch(`/messages/${contactId}`)
        .then(response => response.json())
        .then(data => {
          // Clear existing message list
          messageList.innerHTML = '';

          // Create paragraphs for each message
          data.forEach(message => {
            const paragraph = document.createElement('p');
            paragraph.textContent = message.content;

            if (message.sender_id == authUserId) {
              paragraph.classList.add('sent-message');
            } else {
              paragraph.classList.add('received-message');
              if (!message.read) {
                markMessagesAsRead(contactId); // Mark the message as read
              }
            }

            messageList.appendChild(paragraph);
          });
        });
    }

    const contactList = document.querySelector('.contact-list');

    // Event listener for clicking on a contact
    contactList.addEventListener('click', function (event) {
      if (event.target.classList.contains('contact')) {
        // Set the selectedContactId to the clicked contact's ID
        selectedContactId = event.target.dataset.contactId;
        fetchMessages(selectedContactId);
      }
    });

    // Event listener for sending a message
    const replyForm = document.querySelector('.reply-form');
    const replyInput = document.querySelector('#reply');
    const sendButton = document.querySelector('.reply-form button');

    sendButton.addEventListener('click', function (event) {
      event.preventDefault();
      const content = replyInput.value.trim();
      if (content !== '' && selectedContactId !== null) {
        sendMessage(selectedContactId, content);
      }
    });

    // Function to send a message
    function sendMessage(contactId, content) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); // Get the CSRF token from the meta tag

  // Send data in a regular JavaScript object
  const data = {
    receiver_id: contactId,
    content: content,
  };

  fetch('/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    body: JSON.stringify(data), // Stringify the regular JavaScript object
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        replyInput.value = '';
        fetchMessages(contactId);
      }
    });
}

  </script>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
    // Get the modal and the button
    const modal = document.getElementById('contactAdminModal');
    const btn = document.getElementById('contactAdminBtn');
    const span = document.querySelector('.close-btn');

    // When the button is clicked, show the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the close button (x) is clicked, close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When anywhere outside of the modal is clicked, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});

  </script>
</x-layout>
