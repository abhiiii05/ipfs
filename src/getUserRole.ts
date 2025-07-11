// Plain JavaScript (as you wrote)
const roleMap: { [email: string]: string } = {
  "zurard07@gmail.com": "/stage",
  "202352333@iiitvadodara.ac.in": "/producer",
  "shreetejmeshram07@gmail.com": "/retailer",
  "abhijithviju2005cs@gmail.com": "/wholesaler",
  "aishnabhatia05@gmail.com": "/manufacturer"
};

export default function getUserRole(userEmail: string) {
  return roleMap[userEmail] || "/customer";
}
