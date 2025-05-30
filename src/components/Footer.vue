<template>
  <div class="footer">
    <div class="pull-left">
      <span class="block">&copy; {{ currentYear }} Yushan Wang. All Rights Reserved.</span>
    </div>
    <div class="pull-right">
      <ul class="footer-icons">
        <li>
          <div class="tooltip">Github</div>
          <a
            href="https://github.com/YushanWang9801"
            target="_blank"
            rel="noreferrer"
            aria-label="Find me on Github"
          >
            <font-awesome-icon class="faicon" :icon="['fab', 'github']" />
          </a>
        </li>

        <li>
          <div class="tooltip">Instagram</div>
          <a
            href="https://www.instagram.com/yushan9801/?hl=en"
            target="_blank"
            rel="noreferrer"
            aria-label="Find me on Instagram"
          >
            <font-awesome-icon class="faicon" :icon="['fab', 'instagram']" />
          </a>
        </li>

        <li>
          <div class="tooltip">Email Me</div>
          <a
            href="mailto:yushanwang0816@gmail.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Contact me via Email"
          >
            <font-awesome-icon class="faicon" :icon="['fas', 'envelope']" />
          </a>
        </li>

        <li>
          <div class="tooltip">Medium</div>
          <a
            href="https://medium.com/@wang33he77"
            target="_blank"
            rel="noreferrer"
            aria-label="Find me on Medium"
          >
            <font-awesome-icon class="faicon" :icon="['fab', 'medium']" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faMedium, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

library.add(faGithub, faMedium, faInstagram, faEnvelope)

const currentYear = new Date().getFullYear()
</script>

<script>
export default {
  components: {
    FontAwesomeIcon
  }
}
</script>


<style>
.footer {
    max-width: 950px;
    width: 100%;
    position: relative;
    margin: auto;
    margin-top: 3em;

    padding-top: 2em;
    gap: 2em;
    
    font-family: Optima, "Comic Sans MS", "Comic Sans", cursive, 
    Roboto, Helvetica, Arial, sans-serif;
    border-top: 1px solid var(--secondary);
    color: var(--primary);
    font-size: max(1vw, 15px);
    
    display: flex;
    justify-content: space-between;
}

.pull-left {
    margin: auto 0;
}

.pull-right {
    display: flex;
    justify-content: center;
}

.footer-icons {
    padding-left: 0px;
}

.footer-icons li {
    display: -moz-inline-stack;
    display: inline-block;
}

.footer-icons li a {
    color: var(--primary);
    padding-left: 10px;
    padding-right: 10px;
    text-decoration: none !important;
}

.footer-icons li:hover a{ color: var(--secondary); }

.tooltip{
    position: absolute;
    margin-left: -1vw;
    margin-top: -4.5vh;

    z-index: 1;
    background: var(--secondary);
    color: var(--background);
    opacity: 0;
    
    border-radius: 1.2vw;
    font-size: max(0.9vw, 13.5px);
    font-weight: bold;
    padding: 0.6vh 0.6vw;

    pointer-events: none;
    transition: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.tooltip:before{
    position: absolute;
    content: "";
    height: 10px;
    width: 10px;

    background: var(--secondary);
    left: 50%;
    
    bottom: -4px;
    transform: translateX(-50%) rotate(45deg);
    transition: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.footer-icons li:hover .tooltip{
    opacity: 1;
    pointer-events: auto;
}

@media (max-width: 820px) {
    .footer {
        width: 80%;
        max-width: 60%;
        display: block;
    }

    .pull-left {
        font-size: min(20px, 4vw);
        text-align: center;
        margin-left: 0;
    }
    
    .pull-right {
        position: relative;
        
        margin-top: 2vh;
        padding-top: 2vh;
        margin-right: 0;
        text-align: center;
    }
}

@media (min-width: 821px) and (max-width: 1079px){
    .footer {
        width: 80%;
        max-width: 60%;
        display: block;
    }

    .pull-left {
        font-size: min(20px, 4vw);
        text-align: center;
        margin-left: 0;
    }
    
    .pull-right {
        position: relative;
        
        margin-top: 2vh;
        padding-top: 2vh;
        margin-right: 0;
        text-align: center;
    }
}
</style>
