import discord
import asyncio
import os
import requests
import json
import datetime
import random
import pytz
import discord.utils
from dotenv import load_dotenv
from discord.ext import commands


load_dotenv()

intents = discord.Intents().default()
intents.members = True
PREFIX = "$"
client = commands.Bot(intents=intents,command_prefix='$')


def get_quote():
    response = requests.get("https://zenquotes.io/api/random")
    json_data = json.loads(response.text)
    quote = json_data[0]['q'] + "\n-  " + json_data[0]['a']
    return (quote)

# <----------STATUS MESSAGE---------->
@client.event
async def on_ready():
	guild = client.get_guild(884416707123359785)
	print('we have logged in as {0.user}'.format(client))
	return guild

@client.command()
async def tt(arg):
    await channel.send(arg)


# <----------ACTIVITY STATUS---------->
async def ch_pr():
    await client.wait_until_ready()
    while not client.is_closed():
        await client.change_presence(status=discord.Status.dnd,
                                     activity=discord.Activity(
                                         type=discord.ActivityType.listening,
                                         name='Music in Spotify'))
        await asyncio.sleep(10)
        await client.change_presence(status=discord.Status.online,
                                     activity=discord.Activity(
                                         type=discord.ActivityType.playing,
                                         status=discord.Status.online,
                                         name='The T-Rex (Chrome Dino)'))
        await asyncio.sleep(10)
        await client.change_presence(activity=discord.Activity(
            type=discord.ActivityType.streaming, name='on Youtube'))
        await asyncio.sleep(10)
        await client.change_presence(
            status=discord.Status.idle,
            activity=discord.Activity(
                type=discord.ActivityType.watching,
                status=discord.Status.idle,
                name=
                f'{client.get_guild(884416707123359785).member_count} members on this Server'
            ))
        await asyncio.sleep(10)
        # await client.change_presence(
        #     status=discord.Status.idle, activity=discord.Game("The T-Rex (Chrome Dino)")
        # )   Alteraniting method of playing status


# <----------WELCOME---------->
@client.event
async def on_member_join(member):
    guild = client.get_guild(884416707123359785)  #Server ID
    channel = guild.get_channel(884416707123359788)  #channel ID
    test = guild.get_channel(885516451694395402)  #test channel ID
    timestamp = datetime.datetime.now(
        pytz.timezone('Asia/Kolkata')).strftime('[ %d-%m-%Y %H:%M:%S ]')
    # timestamp = datetime.datetime.now(pytz.timezone('Asia/Kolkata')).strftime(
    #     '%d %b %Y %H:%M:%S')    #another format of time

    embedVar = discord.Embed(
        title=f"New Member Joined to Server",
        description=
        f"<:favicon:885127725646491669> Thankyou for joining  {member.mention}  you are {guild.member_count}th member in server check {test.mention} channel",
        color=discord.Colour.random())

    embedVar.set_author(
        name="Welcome to CODERS EVOKE",
        icon_url=
        "https://cdn.discordapp.com/attachments/884416707123359788/885532153146916874/ajax-loader.gif",
        url="https://coders-evoke-community.github.io/CodersEvoke_website/")
    #create link in author name

    embedVar.add_field(name="Field",
                       value=f"Thanks for joining on",
                       inline=True)

    embedVar.add_field(
        name="Slot results",
        value="<:favicon:885127725646491669> server emoji ")  # ADD EMOJI

    embedVar.set_image(
        url=
        "https://media.discordapp.net/attachments/722437402685341766/801262293693890580/banner.gif"
    )  #banner

    embedVar.set_thumbnail(
        url=
        "https://cdn.discordapp.com/attachments/884416707123359788/885536600258404372/ajax-loader_1.gif"
    )  #logo

    embedVar.set_footer(text=f"{member.mention}           {timestamp}",
                        icon_url=member.avatar_url)

    await channel.send(embed=embedVar)


# <----------MESSAGES---------->
@client.event
async def on_message(message):
	count = 0
	if message.author == client.user or not message.content.startswith(PREFIX):
		return

	space = " ".join((message.content).split())  # remove extra spaces
	if len(space) == 1:
		await message.channel.send('Enter a valid command')

	args = space.lower()  # convert command to lower case
	command = args[1:]  # commands for message send
	games = args[1:5]  # commands for games

	if command == 'hello' or command == 'hi':
		count = count + 1
		await message.channel.send('hello!')

	if command == 'quote':
		count = count + 1	
		quote = get_quote()
		await message.channel.send("```" + quote + "```")

	if command == 'members':
		count = count + 1
		guild = client.get_guild(884416707123359785)  #Server ID
		await message.channel.send(f"Member Count: {guild.member_count}")

	if command == 'help':
		count = count + 1		
		await message.channel.send("```\n" +
		'''COMMAND LIST | use . has prefix

quote    - To get inspirational quote
members  - show no. of members in server
p cf     - To toss a coin''' +
		"```")

	if games == 'p cf':
		count = count + 1
		rand_int = random.randint(0, 100)
		select = args[6:]
		await message.channel.send(f"{message.author.mention} select: {select}"
									)  # See what you select
		await asyncio.sleep(1)
		await message.channel.send(
			f"throwing a coin in the air and checking which side is showing")
		await asyncio.sleep(3)
		if rand_int % 2 == 0:
			result = "head"

		else:
			result = "tail"

		if select == result:
			await message.channel.send(f"It lands {select}! you win")

		else:
			await message.channel.send(f"It lands {result}! You loss")

	if not count:
		await message.channel.send("Wrong command  |  use" + "```" + ".help" +
								"```" + " to see commands list")


# <----------LOOP FOR ACTIVITY STATUS---------->
client.loop.create_task(ch_pr())

# <----------TOKEN---------->
client.run(os.getenv('TOKEN'))
