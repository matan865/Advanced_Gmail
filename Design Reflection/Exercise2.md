

##  Design Reflection — Open/Closed Principle

While transitioning from a console-based application to a client-server architecture, we encountered several design challenges related to the Open/Closed Principle — namely, ensuring that the code is open for extension but closed for modification.

Below are specific points we were asked to address:

---

> Did changing the command names require you to modify code that should be closed to changes?

Yes 

Originally, command handling and business logic were tightly coupled within the Url_io class. This violated the Single Responsibility Principle as Url_io was responsible for both initializing the Bloom Filter and executing command logic (including I/O).

### 🔧 How we fixed it:
We refactored the command handling into a dedicated class: CommandHandler.

This class encapsulates all the business logic: handling POST, GET, and DELETE commands.

It returns string responses, allowing output to be printed either by the console or by the server — depending on the mode of use.

This separation allows command syntax or semantics to evolve without modifying unrelated components.

---

> Did adding new commands require changing closed parts of the code?

Adding support for the DELETE command required us to touch areas where command logic was hardcoded.

### 🛠 Improvement:
By moving to CommandHandler, we can now add new commands like DELETE without affecting the initialization or I/O logic. The logic is centralized and easily extensible.

---

> Did changing the output format require changes to closed components?

Previously, yes.

In the original version, the command logic included direct printing (e.g., cout << ...), which meant any change to formatting required modifying core logic.

### 🛠 Improvement:
Now, CommandHandler::handleCommand returns output as a string. This enables flexible printing — whether to a socket (in Server) or to the console (in Url_io) — without modifying the logic itself.

---

> Did switching input/output from console to sockets affect the closed code?

Previously, yes.

Initially, input/output and command processing were coupled together. Transitioning to sockets required a rewrite.

---

# Final structure:

main() is now responsible for initializing the Bloom Filter and launching the appropriate interface (e.g., server).

The server reads input from a socket and uses CommandHandler for logic.

CommandHandler returns responses, keeping business logic decoupled from the input/output medium.

This structure complies with the Open/Closed Principle and improves modularity.


