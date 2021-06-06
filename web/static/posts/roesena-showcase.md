---
title: RöSeNa-App showcase
description: What technologies and frameworks I used to build a Web-App for a local carnival club.
pubdate: 2021-06-01T15:30:55.516Z
---

# RöSeNa-App showcase

Originally I started this project to experiment a bit with Angular and Firebase. But as time went on
and the App evolved into something nice I went all the way with it.

The "problem" I am solving for the club is the distribution of news, events and images to all the
members. Before it was always a bit of a mess to send information via mail and get responses.

![roesena startpage](posts_rsc/roesena_1.png)

With this page there is one central point to get information for everyone, no matter if you are a
member already or not. The production version of the app can be seen [here](https://rösena.de) and
[this](https://github.com/jgero/roesena-app) is its repo.

![roesena startpage mobile](posts_rsc/roesena_2.png)

Because reacing all the users all the time a mobile version of the app was needed as well. The app
was thus created as a PWA, which enables supporting all desktop and mobile plattforms with one
single codebase. Everything else would be completely out of scope for me as a single person working
on this.

## technologies

### Angular

The web framework used for building the app is angular with it's component library angular-material.
To manage the state of the app the redux pattern is used with the help of NgRx.

### CI with GitHub actions

Continuous integration is used to automatically test and deploy security rules for the firebase
services, cloud functions, database indexes and the hosted files.

### Deployed to Firebase

All the services the app provides are running on the google firebase plattform. This includes the
authentication, image storage, database, cloud functions and hosting.

## features

### authentication

For full usage of the features of the app a user has to log in. This happens with a E-Mail account
and the fireabse auth service. The users can then edit their username for easier identification
whose account this is.

### user groups

Not everyone is supposed to be able to create and see all content on the page. To enable this users
can be assigned to a nuber of groups. These groups can be roles like author or administrator, but
also club-groups to help filtering the users. The access and visibility of content is enforced based
on these groups.

### upload images

Sharing images about events of the club can be done by uploading images. Like all the other content
these are tagged with keywords to enable filtering. When a image is uploaded it automatically gets
resized and compressed to save storage space and ensure a suitable format.

### write articles

Articles are composed and formatted with the help of Markdown. This way the users can include things
like headings, lists and even images without the need of a complex text editor.

### create events

Events are a points in time which show up in a calendar and have a text-based description, much like
already known by many calendar applicaitons. In this app the creator of the event also has the
possibilty to add users as participants of the event. These invited users then can see this
invitation on ther profile and respond if they want to attend it.

### search content

For the search the already mentioned tags and keywords come into play. These can be freely combined
in the search form to filter the content of the page. To get even more precise results the kind of
content that should be searched can be selected.

### mobile and desktop

The purpose of the app is not only to create and view content, but also to keep club members up to
date. This means the distribution of mobile and desktop useres is spread pretty evenly and requires
the app to work well on both types of devices.

### progressive web app

Distributing the app to all the club members is very important. To easily target users of different
plattforms the progressive web app technology was used. This allows to provide a great experience
for desktop and mobile while not having to worry about compatibility.

