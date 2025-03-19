# Web Budget Calculator App

## Project Overview

This project is a web application built using Angular to facilitate the calculation of website budget estimates. Users can select various services, customize their web development requirements, and generate multiple budget estimates. The application dynamically updates the total price based on their selections and provides features like sorting, filtering, and sharing budget details via URLs.

### Technologies Used

- Angular
- HTML, SASS, Bootstrap 5
- Reactive Forms

### Features

#### Basic Budget Selection

Users can select from three services:
- SEO Campaign (€300)
- Advertising Campaign (€400)
- Website Development (€500)

A reactive form updates the total price dynamically based on user selections.

#### Website Customization

If "Website Development" is selected, users can specify:
- Number of pages
- Number of languages

Uses a dedicated Budget service to manage calculations.
Includes input validation using FormGroup and FormControl.

#### User Guidance via Help Modal

A Bootstrap modal is triggered by an info icon button to display explanations of input fields.

#### Multiple Budget Management

Users can create multiple budgets, each containing:

- Client name
- Phone number
- Email
- Selected services
- Total price

Budgets are stored in the Budget service and are then rendered through BudgetListsComponent.

#### Sorting Functionality

Adds three sorting options:

- Sort by date
- Sort by price
- Sort alphabetically

#### Search Functionality

Users can search budgets by client name.

#### URL-Based Budget Sharing

The application updates the URL dynamically based on user selections.
Users can share the generated URL to allow others to view the same budget.

##### Example URLs:
Vercel build:
```bash
https://s6-budget-angular-unax.vercel.app/?SEO=true&ADS=true&WEB=true&pages=4&languages=2
```

Local build:
```bash
http://localhost:4200/?SEO=true&ADS=true&WEB=true&pages=4&languages=2
```


##### Installation & Setup

You can open the app by following this link: 
```bash
http://s6-budget-angular-unax.vercel.app
```

Or you can:

1. Clone the repository:

```bash
git clone https://github.com/oscarrep/S6-Budget-Angular
```

2. Navigate to the project folder:

```bash
cd s6-budget-angular
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
ng serve -o
```

5. Open in browser:

```bash
http://localhost:4200
```