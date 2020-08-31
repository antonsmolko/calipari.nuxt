/* eslint-disable */
/*! UIkit 3.5.6 | https://www.getuikit.com | (c) 2014 - 2020 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
      typeof define === 'function' && define.amd ? define('uikiticons', factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitIcons = factory());
}(this, (function () { 'use strict';

    function plugin(UIkit) {

        if (plugin.installed) {
            return;
        }

        UIkit.icon.add({
            "album": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"5\" y=\"2\" width=\"10\" height=\"1\"/><rect x=\"3\" y=\"4\" width=\"14\" height=\"1\"/><rect fill=\"none\" stroke=\"#000\" x=\"1.5\" y=\"6.5\" width=\"17\" height=\"11\"/></svg>",
            "arrow-left": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" points=\"10 14 5 9.5 10 5\"/><line fill=\"none\" stroke=\"#000\" x1=\"16\" y1=\"9.5\" x2=\"5\" y2=\"9.52\"/></svg>",
            "arrow-right": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" points=\"10 5 15 9.5 10 14\"/><line fill=\"none\" stroke=\"#000\" x1=\"4\" y1=\"9.5\" x2=\"15\" y2=\"9.5\"/></svg>",
            "bag": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><polygon fill=\"none\" stroke=\"#000\" points=\"3.5,5.5 16.5,5.5 17.5,18.5 2.5,18.5\"/><path fill=\"none\" stroke=\"#000\" d=\"M6.5,9V4.8C6.5,3,8,1.5,10,1.5s3.5,1.5,3.5,3.3V9\"/></svg>",
            "black": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#000\" stroke-width=\"0\" d=\"M12.5,3.5v-1H9.43v-1H4.57v1H1.5v16h11v-1h6v-14H12.5z M11.5,17.5h-9v-14h9V17.5z M14,16.5h-1.5V15H14V16.5z M14,6h-1.5V4.5 H14V6z M17,16.5h-1.5V15H17V16.5z M17,6h-1.5V4.5H17V6z\"/><path fill=\"#000\" stroke-width=\"0\" d=\"M10.6,11.94c0,1.44-0.72,2.16-2.16,2.16H3.4V6.9h5.04c1.43,0,2.15,0.72,2.16,2.15c0,0.66-0.15,1.14-0.46,1.44 C10.45,10.8,10.6,11.28,10.6,11.94z M9.16,9.06c0-0.48-0.24-0.72-0.72-0.72h-3.6v1.44h3.6C8.92,9.78,9.16,9.54,9.16,9.06z M9.16,11.94c0-0.48-0.24-0.72-0.72-0.72h-3.6v1.44h3.6C8.92,12.66,9.16,12.42,9.16,11.94z\"/></svg>",
            "calipari": "<svg width=\"90\" height=\"30\" viewBox=\"0 0 90 30\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M16.11,7.03c0.51-1.04,0.61-1.92,0.3-2.91c-0.3-0.84-1.07-1.82-1.84-2.46c-1.12-0.94-2.81-0.79-4.65-0.1C6.04,3.03-0.15,9.05,0,16.15c0.05,2.71,1.43,4.83,2.96,5.62c1.89,0.99,4.75,1.04,7.21-0.69c1.43-1.04,3.63-3.5,2.81-5.77c-0.2-0.4-0.56-0.4-0.71-0.05c-2.6,4.93-6.28,7.15-8.53,5.48C2.05,19.42,1.74,14.48,4.76,9.6c3.11-4.99,8.38-7.7,9.35-6.66c0.82,0.79-0.41,2.71-1.02,4.44c-0.51,1.68,0.05,2.71,0.82,3.21c0.41,0.29,0.66,0.05,0.76-0.2C15.09,9.4,15.6,8.12,16.11,7.03z\"/><path d=\"M44.54,9.05c0.41-0.44,0.66-1.38,0.25-2.22c-0.41-0.89-1.43-1.28-1.99-0.74c-0.56,0.55-0.71,1.58-0.21,2.46C43.06,9.4,44.03,9.5,44.54,9.05z\"/><path d=\"M88.92,17.05c-1.07,2.32-2.91,4.49-4.5,4.59c-1.12,0.05-1.17-1.23-0.36-3.16c0.71-1.68,2.15-3.95,2.86-5.43c0.82-1.68,0.56-3.11,0.05-3.6c-0.31-0.29-0.51-0.2-0.82,0.2c-1.28,1.73-3.58,5.67-4.39,8.14c-0.1,0.35-0.2,0.64-0.3,0.94c-1.07,1.78-2.35,3.06-3.47,3.01c-1.07-0.05-1.43-1.38-0.87-3.21c0.56-1.68,2.3-3.99,3.93-5.82c1.02-1.13,0.21-2.71-0.46-3.41C80.28,8.94,80.03,9,79.51,9.34c-1.28,0.89-2.61,1.43-3.83,1.58c0.71-2.32,1.07-4.24,0-4.24c-1.38,0.1-4.65,4.64-1.89,5.62c-1.63,4.93-4.75,8.98-6.95,9.22c-1.07,0.1-1.22-1.13-0.41-3.06c0.76-1.73,2.61-4.29,3.27-5.82c0.76-1.68,0.51-3.06-0.05-3.65c-0.31-0.29-0.56-0.2-0.82,0.2c-0.25,0.35-0.66,1.04-1.22,1.88c0-1.18-0.66-2.22-1.99-2.22c-1.79,0-4.5,1.53-7.26,5.38c-0.82,1.18-1.33,2.37-1.63,3.5c-1.17,2.07-3.17,4.14-6.24,4.24c1.28-0.79,2.61-2.37,3.63-4.59c1.28-2.71,1.99-5.72,0.41-7.4c-1.48-1.48-3.53-0.54-5.06,0.69c0.05-0.54-0.05-1.09-0.2-1.48c-0.21-0.4-0.46-0.44-0.82-0.05c-1.38,1.78-4.19,6.61-6.34,10.75c-0.87,1.04-1.84,1.73-2.71,1.73c-1.12,0.05-1.17-1.23-0.36-3.16c0.71-1.68,2.15-3.95,2.86-5.43c0.82-1.68,0.56-3.11,0.05-3.6c-0.3-0.29-0.51-0.2-0.82,0.2c-1.28,1.73-3.58,5.67-4.39,8.14c0,0.05,0,0.05,0,0.1c-1.38,2.12-3.37,3.9-4.8,3.8c-1.53-0.15-1.17-2.91,0.2-6.16c3.07-1.92,6.95-5.92,8.03-10.06c0.41-1.58,0.2-2.76-0.82-3.65c-0.46-0.4-0.97-0.4-1.48,0.2c-3.42,3.41-7.41,9.52-8.64,15.29c-0.05,0.2-0.05,0.35-0.1,0.49c-1.22,2.02-2.86,3.9-4.19,3.99c-1.17,0.05-1.17-1.38-0.3-3.26c0.82-1.78,2.55-4.24,3.32-5.82c0.82-1.68,0.56-3.11,0.05-3.7c-0.25-0.29-0.51-0.25-0.82,0.2c-0.41,0.54-0.82,1.23-1.22,2.02c0.05-1.28-0.61-2.42-2.09-2.42c-1.74,0-4.45,1.48-7.26,5.43c-2.86,4.05-2.2,8.29,1.02,8.29c1.68,0,3.22-1.23,4.34-2.61c0,1.58,0.97,2.66,2.81,2.71c1.53,0.1,3.22-1.13,4.34-2.52c0.36,1.58,1.38,2.32,3.01,2.37c1.68,0.05,3.32-0.99,4.39-1.97c0.21,1.23,1.07,2.07,2.71,2.07c0.61,0,1.22-0.15,1.89-0.4c-0.71,1.48-1.28,2.76-1.53,3.55c-0.66,2.02-0.46,2.96,0.05,3.65c0.21,0.29,0.41,0.25,0.56-0.05c1.68-3.7,3.42-7.11,5.06-9.97c0.1,0.84,0.41,1.63,1.17,2.22c1.22,1.09,2.66,1.38,4.91,1.23c2.15-0.15,4.19-0.99,5.57-2.71c0.3,1.38,1.22,2.32,2.71,2.32c1.68,0,3.27-1.28,4.39-2.71c-0.05,1.73,1.02,2.86,2.86,2.71c3.68-0.29,6.85-5.28,8.49-10.01c1.07,0,2.55-0.4,4.09-1.23c-1.48,1.63-3.63,4.1-4.29,6.27c-0.82,2.71,0.21,4.98,2.81,5.03c1.28,0.05,2.66-0.59,3.63-1.68c0.36,1.04,1.17,1.63,2.61,1.63c1.94,0,4.14-1.38,5.16-3.5c0.41-0.84,0.51-1.53,0.25-2.07C89.38,16.8,89.13,16.8,88.92,17.05z M33.6,12.36c2.4-4.24,4.96-7.99,5.37-7.69c0.46,0.29-1.48,5.62-6.24,9.32C33.03,13.44,33.29,12.95,33.6,12.36z M17.9,21.48c-1.33-0.05-0.92-2.96,0.92-5.82c1.94-2.96,4.39-5.13,5.52-5.03c1.02,0.1,0.66,2.17-1.48,5.82C21.12,19.36,19.33,21.53,17.9,21.48z M47.05,20.94c-0.97-0.79-0.82-2.76,0.05-4.88c0.41-0.69,0.82-1.28,1.17-1.92c1.63-2.57,3.73-4.24,4.6-3.85c0.87,0.4,0.46,3.16-0.87,5.82C50.32,19.36,48.12,21.78,47.05,20.94z M59.88,21.38c-1.33-0.05-0.97-2.91,0.92-5.82c1.94-2.91,4.39-5.03,5.47-5.03c1.02,0.05,0.66,2.17-1.43,5.82C63.05,19.36,61.21,21.44,59.88,21.38z\"/><path d=\"M89.54,9.05c0.41-0.44,0.66-1.38,0.25-2.22c-0.41-0.89-1.43-1.28-1.99-0.74c-0.56,0.54-0.71,1.58-0.2,2.46C88.11,9.4,89.03,9.5,89.54,9.05z\"/></svg>",
            "check": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" points=\"4,10 8,15 17,4\"/></svg>",
            "chevron-down": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.03\" points=\"16 7 10 13 4 7\"/></svg>",
            "chevron-left": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.03\" points=\"13 16 7 10 13 4\"/></svg>",
            "chevron-right": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.03\" points=\"7 4 13 10 7 16\"/></svg>",
            "chevron-up": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.03\" points=\"4 13 10 7 16 13\"/></svg>",
            "close": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"none\" stroke=\"#000\" stroke-width=\"1.06\" d=\"M16,16 L4,4\"/><path fill=\"none\" stroke=\"#000\" stroke-width=\"1.06\" d=\"M16,4 L4,16\"/></svg>",
            "comment": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6,18.71 L6,14 L1,14 L1,1 L19,1 L19,14 L10.71,14 L6,18.71 L6,18.71 Z M2,13 L7,13 L7,16.29 L10.29,13 L18,13 L18,2 L2,2 L2,13 L2,13 Z\"/></svg>",
            "facebook": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M11,10h2.6l0.4-3H11V5.3c0-0.9,0.2-1.5,1.5-1.5H14V1.1c-0.3,0-1-0.1-2.1-0.1C9.6,1,8,2.4,8,5v2H5.5v3H8v8h3V10z\"/></svg>",
            "first-name": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M14.24,3.24c0.05-0.09,0.12-0.16,0.2-0.23c0.08-0.06,0.17-0.09,0.27-0.09h0.75v14.15h-1.03V5.45c0-0.21,0-0.43,0.01-0.65c0.01-0.22,0.03-0.46,0.06-0.7c-0.09,0.21-0.19,0.4-0.28,0.57C14.13,4.84,14.03,5,13.94,5.14L5.77,16.75c-0.05,0.09-0.12,0.16-0.21,0.22c-0.08,0.06-0.17,0.1-0.28,0.1H4.54V2.93h1.03v11.62c0,0.21,0,0.43-0.01,0.66c-0.01,0.22-0.03,0.46-0.06,0.69c0.09-0.21,0.19-0.39,0.28-0.56c0.09-0.17,0.19-0.33,0.28-0.49L14.24,3.24z\"/></svg>",
            "flip-h": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><polygon fill=\"none\" stroke=\"#000\" points=\"17.5,15 12.5,10 17.5,5\"/><polygon fill=\"none\" stroke=\"#000\" points=\"2.5,15 7.5,10 2.5,5\"/><rect x=\"9.5\" y=\"1.5\" width=\"1\" height=\"1\"/><rect x=\"9.5\" y=\"3.5\" width=\"1\" height=\"1\"/><rect x=\"9.5\" y=\"5.5\" width=\"1\" height=\"1\"/><rect x=\"9.5\" y=\"7.5\" width=\"1\" height=\"1\"/><rect x=\"9.5\" y=\"9.5\" width=\"1\" height=\"1\"/><rect x=\"9.5\" y=\"11.5\" width=\"1\" height=\"1\"/><rect x=\"9.5\" y=\"13.5\" width=\"1\" height=\"1\"/><rect x=\"9.5\" y=\"15.5\" width=\"1\" height=\"1\"/><rect x=\"9.5\" y=\"17.5\" width=\"1\" height=\"1\"/></svg>",
            "flip-v": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><polygon fill=\"none\" stroke=\"#000\" points=\"5,17.5 10,12.5 15,17.5\"/><polygon fill=\"none\" stroke=\"#000\" points=\"5,2.5 10,7.5 15,2.5\"/><rect x=\"1.5\" y=\"9.5\" width=\"1\" height=\"1\"/><rect x=\"3.5\" y=\"9.5\" width=\"1\" height=\"1\"/><rect x=\"5.5\" y=\"9.5\" width=\"1\" height=\"1\"/><rect x=\"7.5\" y=\"9.5\" width=\"1\" height=\"1\"/><rect x=\"9.5\" y=\"9.5\" width=\"1\" height=\"1\"/><rect x=\"11.5\" y=\"9.5\" width=\"1\" height=\"1\"/><rect x=\"13.5\" y=\"9.5\" width=\"1\" height=\"1\"/><rect x=\"15.5\" y=\"9.5\" width=\"1\" height=\"1\"/><rect x=\"17.5\" y=\"9.5\" width=\"1\" height=\"1\"/></svg>",
            "google": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.86,9.09 C18.46,12.12 17.14,16.05 13.81,17.56 C9.45,19.53 4.13,17.68 2.47,12.87 C0.68,7.68 4.22,2.42 9.5,2.03 C11.57,1.88 13.42,2.37 15.05,3.65 C15.22,3.78 15.37,3.93 15.61,4.14 C14.9,4.81 14.23,5.45 13.5,6.14 C12.27,5.08 10.84,4.72 9.28,4.98 C8.12,5.17 7.16,5.76 6.37,6.63 C4.88,8.27 4.62,10.86 5.76,12.82 C6.95,14.87 9.17,15.8 11.57,15.25 C13.27,14.87 14.76,13.33 14.89,11.75 L10.51,11.75 L10.51,9.09 L17.86,9.09 L17.86,9.09 Z\"/></svg>",
            "hashtag": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15.431,8 L15.661,7 L12.911,7 L13.831,3 L12.901,3 L11.98,7 L9.29,7 L10.21,3 L9.281,3 L8.361,7 L5.23,7 L5,8 L8.13,8 L7.21,12 L4.23,12 L4,13 L6.98,13 L6.061,17 L6.991,17 L7.911,13 L10.601,13 L9.681,17 L10.611,17 L11.531,13 L14.431,13 L14.661,12 L11.76,12 L12.681,8 L15.431,8 Z M10.831,12 L8.141,12 L9.061,8 L11.75,8 L10.831,12 Z\"/></svg>",
            "heart-fill": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#000\" stroke=\"#000\" stroke-width=\"1.03\" d=\"M10,4 C10,4 8.1,2 5.74,2 C3.38,2 1,3.55 1,6.73 C1,8.84 2.67,10.44 2.67,10.44 L10,18 L17.33,10.44 C17.33,10.44 19,8.84 19,6.73 C19,3.55 16.62,2 14.26,2 C11.9,2 10,4 10,4 L10,4 Z\"/></svg>",
            "heart": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"none\" stroke=\"#000\" stroke-width=\"1.03\" d=\"M10,4 C10,4 8.1,2 5.74,2 C3.38,2 1,3.55 1,6.73 C1,8.84 2.67,10.44 2.67,10.44 L10,18 L17.33,10.44 C17.33,10.44 19,8.84 19,6.73 C19,3.55 16.62,2 14.26,2 C11.9,2 10,4 10,4 L10,4 Z\"/></svg>",
            "home": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"18.65 11.35 10 2.71 1.35 11.35 0.65 10.65 10 1.29 19.35 10.65\"/><polygon points=\"15 4 18 4 18 7 17 7 17 5 15 5\"/><polygon points=\"3 11 4 11 4 18 7 18 7 12 12 12 12 18 16 18 16 11 17 11 17 19 11 19 11 13 8 13 8 19 3 19\"/></svg>",
            "instagram": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M13.55,1H6.46C3.45,1,1,3.44,1,6.44v7.12c0,3,2.45,5.44,5.46,5.44h7.08c3.02,0,5.46-2.44,5.46-5.44V6.44 C19.01,3.44,16.56,1,13.55,1z M17.5,14c0,1.93-1.57,3.5-3.5,3.5H6c-1.93,0-3.5-1.57-3.5-3.5V6c0-1.93,1.57-3.5,3.5-3.5h8 c1.93,0,3.5,1.57,3.5,3.5V14z\"/><circle cx=\"14.87\" cy=\"5.26\" r=\"1.09\"/><path d=\"M10.03,5.45c-2.55,0-4.63,2.06-4.63,4.6c0,2.55,2.07,4.61,4.63,4.61c2.56,0,4.63-2.061,4.63-4.61 C14.65,7.51,12.58,5.45,10.03,5.45L10.03,5.45L10.03,5.45z M10.08,13c-1.66,0-3-1.34-3-2.99c0-1.65,1.34-2.99,3-2.99s3,1.34,3,2.99 C13.08,11.66,11.74,13,10.08,13L10.08,13L10.08,13z\"/></svg>",
            "landscape": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"1.5\" y=\"4.5\" class=\"st0\" width=\"17\" height=\"11\"/></svg>",
            "last-name": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10.49,4.22c0.94,0.01,1.79,0.17,2.54,0.48c0.75,0.31,1.39,0.72,1.92,1.24c0.53,0.52,0.93,1.12,1.21,1.82c0.28,0.69,0.43,1.42,0.43,2.18c0,0.78-0.14,1.52-0.43,2.21s-0.69,1.3-1.21,1.82s-1.17,0.93-1.92,1.24c-0.75,0.31-1.6,0.46-2.54,0.47v1.75H9.52v-1.75c-0.94-0.01-1.79-0.16-2.54-0.47c-0.76-0.31-1.4-0.72-1.93-1.24c-0.53-0.52-0.93-1.13-1.21-1.82S3.4,10.72,3.4,9.94c0-0.77,0.15-1.49,0.43-2.18c0.29-0.69,0.7-1.3,1.24-1.82C5.61,5.42,6.25,5.01,7,4.7s1.59-0.47,2.52-0.48V2.57h0.98V4.22z M4.44,9.94c0,0.67,0.12,1.31,0.36,1.91c0.24,0.6,0.58,1.12,1.02,1.56c0.44,0.45,0.97,0.8,1.6,1.06c0.63,0.26,1.33,0.39,2.1,0.4V5.02c-0.77,0.01-1.47,0.14-2.1,0.41C6.79,5.7,6.25,6.05,5.81,6.5C5.37,6.95,5.03,7.47,4.79,8.06C4.56,8.65,4.44,9.28,4.44,9.94z M15.56,9.94c0-0.66-0.12-1.29-0.36-1.88c-0.24-0.59-0.58-1.11-1.02-1.56c-0.44-0.45-0.97-0.8-1.6-1.07c-0.62-0.27-1.32-0.4-2.09-0.41v9.85c0.77-0.01,1.47-0.14,2.09-0.4c0.62-0.26,1.16-0.61,1.6-1.06c0.44-0.45,0.78-0.97,1.02-1.56S15.56,10.61,15.56,9.94z\"/></svg>",
            "ll-menu": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2\" y=\"6.5\" width=\"16\" height=\"1\"/><rect x=\"2\" y=\"12.5\" width=\"16\" height=\"1\"/></svg>",
            "location": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"none\" stroke=\"#000\" stroke-width=\"1.01\" d=\"M10,0.5 C6.41,0.5 3.5,3.39 3.5,6.98 C3.5,11.83 10,19 10,19 C10,19 16.5,11.83 16.5,6.98 C16.5,3.39 13.59,0.5 10,0.5 L10,0.5 Z\"/><circle fill=\"none\" stroke=\"#000\" cx=\"10\" cy=\"6.8\" r=\"2.3\"/></svg>",
            "lock": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect fill=\"none\" stroke=\"#000\" height=\"10\" width=\"13\" y=\"8.5\" x=\"3.5\"/><path fill=\"none\" stroke=\"#000\" d=\"M6.5,8 L6.5,4.88 C6.5,3.01 8.07,1.5 10,1.5 C11.93,1.5 13.5,3.01 13.5,4.88 L13.5,8\"/></svg>",
            "magnifyingglass": "<svg width=\"23\" height=\"24\" viewBox=\"0 0 23 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2.82,10.27c0-3.87,3.16-7.03,7.03-7.03s7.03,3.16,7.03,7.03c0,1.63-0.57,3.14-1.5,4.34l4.54,4.56c0.19,0.18,0.26,0.41,0.26,0.65c0,0.53-0.37,0.95-0.92,0.95c-0.25,0-0.5-0.1-0.67-0.27l-4.56-4.57c-1.17,0.86-2.62,1.38-4.18,1.38C5.98,17.3,2.82,14.13,2.82,10.27z M15.57,10.27c0-3.13-2.59-5.71-5.72-5.71s-5.71,2.58-5.71,5.71s2.58,5.72,5.71,5.72S15.57,13.4,15.57,10.27z\"/></svg>",
            "mail": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" points=\"1.4,6.5 10,11 18.6,6.5\"/><path d=\"M 1,4 1,16 19,16 19,4 1,4 Z M 18,15 2,15 2,5 18,5 18,15 Z\"/></svg>",
            "menu": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2\" y=\"4\" width=\"16\" height=\"1\"/><rect x=\"2\" y=\"9\" width=\"16\" height=\"1\"/><rect x=\"2\" y=\"14\" width=\"16\" height=\"1\"/></svg>",
            "middle-name": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M16.75,10c0,1.09-0.16,2.09-0.49,2.98c-0.33,0.89-0.79,1.65-1.38,2.28c-0.59,0.63-1.3,1.12-2.13,1.46S11,17.23,10,17.23s-1.91-0.17-2.74-0.51s-1.54-0.83-2.13-1.46s-1.05-1.39-1.38-2.28C3.42,12.09,3.25,11.09,3.25,10c0-1.09,0.16-2.07,0.49-2.96c0.33-0.89,0.79-1.65,1.38-2.28c0.59-0.63,1.3-1.12,2.13-1.46S9,2.77,10,2.77s1.92,0.17,2.75,0.52s1.54,0.83,2.13,1.46c0.59,0.63,1.05,1.4,1.38,2.29C16.58,7.93,16.75,8.91,16.75,10z M15.69,10c0-0.99-0.14-1.87-0.41-2.66c-0.27-0.79-0.66-1.45-1.16-2c-0.5-0.55-1.1-0.96-1.8-1.25S10.84,3.65,10,3.65c-0.84,0-1.61,0.15-2.31,0.44c-0.7,0.29-1.3,0.71-1.81,1.25c-0.5,0.55-0.89,1.21-1.17,2C4.43,8.13,4.29,9.01,4.29,10c0,0.99,0.14,1.88,0.42,2.67c0.28,0.78,0.67,1.45,1.17,2s1.1,0.96,1.81,1.25c0.7,0.29,1.47,0.43,2.31,0.43c0.85,0,1.62-0.14,2.32-0.43c0.7-0.29,1.3-0.7,1.8-1.25s0.89-1.21,1.16-2S15.69,10.99,15.69,10z\"/></svg>",
            "more-vertical": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"10\" cy=\"3\" r=\"2\"/><circle cx=\"10\" cy=\"10\" r=\"2\"/><circle cx=\"10\" cy=\"17\" r=\"2\"/></svg>",
            "panorama": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path class=\"st0\" d=\"M18.79,5.61v8.79c-2.29-0.53-5.28-1-8.79-1s-6.5,0.47-8.79,1c0-2.93,0-5.86,0-8.79c2.27,0.52,5.22,0.99,8.68,1C13.44,6.62,16.47,6.14,18.79,5.61z\"/></svg>",
            "pencil": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"none\" stroke=\"#000\" d=\"M17.25,6.01 L7.12,16.1 L3.82,17.2 L5.02,13.9 L15.12,3.88 C15.71,3.29 16.66,3.29 17.25,3.88 C17.83,4.47 17.83,5.42 17.25,6.01 L17.25,6.01 Z\"/><path fill=\"none\" stroke=\"#000\" d=\"M15.98,7.268 L13.851,5.148\"/></svg>",
            "phone": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"none\" stroke=\"#000\" d=\"M15.5,17 C15.5,17.8 14.8,18.5 14,18.5 L7,18.5 C6.2,18.5 5.5,17.8 5.5,17 L5.5,3 C5.5,2.2 6.2,1.5 7,1.5 L14,1.5 C14.8,1.5 15.5,2.2 15.5,3 L15.5,17 L15.5,17 L15.5,17 Z\"/><circle cx=\"10.5\" cy=\"16.5\" r=\".8\"/></svg>",
            "plus": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"9\" y=\"1\" width=\"1\" height=\"17\"/><rect x=\"1\" y=\"9\" width=\"17\" height=\"1\"/></svg>",
            "portrait": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"4.5\" y=\"1.5\" class=\"st0\" width=\"11\" height=\"17\"/></svg>",
            "seamless": "<svg width=\"30\" height=\"20\" viewBox=\"0 0 30 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect fill=\"#B3B3B3\" width=\"30\" height=\"20\"/></svg>",
            "search": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"9\" cy=\"9\" r=\"7\"/><path fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" d=\"M14,14 L18,18 L14,14 Z\"/></svg>",
            "sepia": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#000\" stroke-width=\"0\" d=\"M12.5,3.5v-1H9.43v-1H4.57v1H1.5v16h11v-1h6v-14H12.5z M11.5,17.5h-9v-14h9V17.5z M14,16.5h-1.5V15H14V16.5z M14,6h-1.5V4.5 H14V6z M17,16.5h-1.5V15H17V16.5z M17,6h-1.5V4.5H17V6z\"/><path fill=\"#000\" stroke-width=\"0\" d=\"M10.6,11.94c0,1.44-0.72,2.16-2.16,2.16H3.76v-1.44h4.68c0.48,0,0.72-0.24,0.72-0.72s-0.24-0.72-0.72-0.72H5.56 c-1.44,0-2.16-0.72-2.16-2.16S4.12,6.9,5.56,6.9h4.68v1.44H5.56c-0.48,0-0.72,0.24-0.72,0.72s0.24,0.72,0.72,0.72h2.88 C9.88,9.78,10.6,10.5,10.6,11.94z\"/></svg>",
            "settings": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><ellipse fill=\"none\" stroke=\"#000\" cx=\"6.11\" cy=\"3.55\" rx=\"2.11\" ry=\"2.15\"/><ellipse fill=\"none\" stroke=\"#000\" cx=\"6.11\" cy=\"15.55\" rx=\"2.11\" ry=\"2.15\"/><circle fill=\"none\" stroke=\"#000\" cx=\"13.15\" cy=\"9.55\" r=\"2.15\"/><rect x=\"1\" y=\"3\" width=\"3\" height=\"1\"/><rect x=\"10\" y=\"3\" width=\"8\" height=\"1\"/><rect x=\"1\" y=\"9\" width=\"8\" height=\"1\"/><rect x=\"15\" y=\"9\" width=\"3\" height=\"1\"/><rect x=\"1\" y=\"15\" width=\"3\" height=\"1\"/><rect x=\"10\" y=\"15\" width=\"8\" height=\"1\"/></svg>",
            "square": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"3.2\" y=\"3.2\" class=\"st0\" width=\"13.61\" height=\"13.61\"/></svg>",
            "star": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><polygon fill=\"none\" stroke=\"#000\" stroke-width=\"1.01\" points=\"10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27\"/></svg>",
            "stripes": "<svg width=\"30\" height=\"20\" viewBox=\"0 0 30 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect fill=\"#B3B3B3\" width=\"8.8\" height=\"20\"/><rect fill=\"#B3B3B3\" x=\"10.6\" width=\"8.8\" height=\"20\"/><rect fill=\"#B3B3B3\" x=\"21.2\" width=\"8.8\" height=\"20\"/></svg>",
            "thumbcircles": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"none\" class=\"c1\" cx=\"6\" cy=\"6\" r=\"3\"/><circle fill=\"none\" stroke=\"none\" class=\"c2\" cx=\"14\" cy=\"6\" r=\"3\"/><circle fill=\"none\" stroke=\"none\" class=\"c3\" cx=\"14\" cy=\"14\" r=\"3\"/><circle fill=\"none\" stroke=\"none\" class=\"c4\" cx=\"6\" cy=\"14\" r=\"3\"/></svg>",
            "thumbnails": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect fill=\"none\" stroke=\"#000\" x=\"3.5\" y=\"3.5\" width=\"5\" height=\"5\"/><rect fill=\"none\" stroke=\"#000\" x=\"11.5\" y=\"3.5\" width=\"5\" height=\"5\"/><rect fill=\"none\" stroke=\"#000\" x=\"11.5\" y=\"11.5\" width=\"5\" height=\"5\"/><rect fill=\"none\" stroke=\"#000\" x=\"3.5\" y=\"11.5\" width=\"5\" height=\"5\"/></svg>",
            "thumbrects": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect fill=\"none\" stroke=\"none\" class=\"r1\" x=\"3.5\" y=\"3.5\" width=\"5\" height=\"5\"/><rect fill=\"none\" stroke=\"none\" class=\"r2\" x=\"11.5\" y=\"3.5\" width=\"5\" height=\"5\"/><rect fill=\"none\" stroke=\"none\" class=\"r3\" x=\"11.5\" y=\"11.5\" width=\"5\" height=\"5\"/><rect fill=\"none\" stroke=\"none\" class=\"r4\" x=\"3.5\" y=\"11.5\" width=\"5\" height=\"5\"/></svg>",
            "trash": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" points=\"6.5 3 6.5 1.5 13.5 1.5 13.5 3\"/><polyline fill=\"none\" stroke=\"#000\" points=\"4.5 4 4.5 18.5 15.5 18.5 15.5 4\"/><rect x=\"8\" y=\"7\" width=\"1\" height=\"9\"/><rect x=\"11\" y=\"7\" width=\"1\" height=\"9\"/><rect x=\"2\" y=\"3\" width=\"16\" height=\"1\"/></svg>",
            "user": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"9.9\" cy=\"6.4\" r=\"4.4\"/><path fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" d=\"M1.5,19 C2.3,14.5 5.8,11.2 10,11.2 C14.2,11.2 17.7,14.6 18.5,19.2\"/></svg>",
            "vk": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M18.7,5.3c0.1-0.4,0-0.8-0.6-0.8h-2c-0.5,0-0.8,0.3-0.9,0.6c0,0-1.1,2.5-2.5,4.1c-0.5,0.5-0.7,0.6-1,0.6\tc-0.1,0-0.3-0.2-0.3-0.6V5.3c0-0.5-0.1-0.8-0.6-0.8H7.8C7.5,4.5,7.3,4.7,7.3,5c0,0.5,0.7,0.6,0.8,1.9v3c0,0.7-0.1,0.8-0.4,0.8\tc-0.7,0-2.3-2.5-3.3-5.4C4.3,4.8,4.1,4.5,3.6,4.5h-2C1,4.5,0.9,4.8,0.9,5.1c0,0.6,0.7,3.2,3.2,6.6c1.6,2.4,3.9,3.6,6.1,3.6\tc1.2,0,1.4-0.3,1.4-0.8c0-2.3-0.1-2.5,0.5-2.5c0.3,0,0.8,0.2,2,1.2c1.3,1.3,1.5,1.9,2.3,1.9h2c0.6,0,0.9-0.3,0.7-0.9\tc-0.4-1.1-3-3.6-3.1-3.7c-0.3-0.4-0.2-0.6,0-0.9C16,9.9,18.4,6.5,18.7,5.3L18.7,5.3z\"/></svg>",
            "world": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"none\" stroke=\"#000\" d=\"M1,10.5 L19,10.5\"/><path fill=\"none\" stroke=\"#000\" d=\"M2.35,15.5 L17.65,15.5\"/><path fill=\"none\" stroke=\"#000\" d=\"M2.35,5.5 L17.523,5.5\"/><path fill=\"none\" stroke=\"#000\" d=\"M10,19.46 L9.98,19.46 C7.31,17.33 5.61,14.141 5.61,10.58 C5.61,7.02 7.33,3.83 10,1.7 C10.01,1.7 9.99,1.7 10,1.7 L10,1.7 C12.67,3.83 14.4,7.02 14.4,10.58 C14.4,14.141 12.67,17.33 10,19.46 L10,19.46 L10,19.46 L10,19.46 Z\"/><circle fill=\"none\" stroke=\"#000\" cx=\"10\" cy=\"10.5\" r=\"9\"/></svg>",
            "yandex": "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10.83,11.52L7.94,18h-2.1l3.17-6.93c-1.49-0.76-2.48-2.13-2.48-4.66c0-3.55,2.25-5.32,4.92-5.32h2.72V18h-1.82v-6.48H10.83L10.83,11.52z M12.34,2.63h-0.97c-1.47,0-2.89,0.97-2.89,3.78c0,2.72,1.3,3.59,2.89,3.59h0.97V2.63z\"/></svg>"
        });

    }

    if (typeof window !== 'undefined' && window.UIkit) {
        window.UIkit.use(plugin);
    }

    return plugin;

})));
/* eslint-enable */
