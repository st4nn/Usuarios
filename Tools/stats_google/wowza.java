package com.cehis.wms.module;

import com.wowza.wms.application.*;
import com.wowza.wms.amf.*;
import com.wowza.wms.client.*;
import com.wowza.wms.module.*;
import com.wowza.wms.request.*;
import com.wowza.wms.stream.*;

import java.sql.*;
import java.util.Calendar;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;



public class MyFirstStats extends ModuleBase {

	public void doSomething(IClient client, RequestFunction function,
			AMFDataList params) {
		System.out.print("\n\n\n INICIO Evento doSomething \n");
		getLogger().info("doSomething");
		sendResult(client, params, "Hello Wowza");
		System.out.print("\n FIN Evento doSomething \n\n\n");
		//System.out.print("-------------------------------------------------");
	}

	public void onAppStart(IApplicationInstance appInstance) {
		System.out.print("\n\n\n INICIO Evento onAppStart \n");
		String fullname = appInstance.getApplication().getName() + "/"
				+ appInstance.getName();
		getLogger().info("onAppStart: " + fullname);
		System.out.print("\n FIN Evento onAppStart \n\n\n");
		//System.out.print("-------------------------------------------------");
	}

	public void onAppStop(IApplicationInstance appInstance) {
		System.out.print("\n\n\n INICIO Evento onAppStop \n");
		String fullname = appInstance.getApplication().getName() + "/"
				+ appInstance.getName();
		getLogger().info("onAppStop: " + fullname);
		System.out.print("\n FIN Evento onAppStop \n\n\n");
		//System.out.print("-------------------------------------------------");
	}

	public void onConnect(IClient client, RequestFunction function,
			AMFDataList params) {
		System.out.print("\n\n\n INICIO EVENTO onConnect \n");
		getLogger().info("onConnect: " + client.getClientId());
		System.out.print("\n FIN EVENTO onConnect \n\n\n");
		//System.out.print("-------------------------------------------------");
	}

	public void onConnectAccept(IClient client) {
		System.out.print("\n\n\n INICIO EVENTO onConnectAccept \n");
			ConectarDesconectar(client, "in");
				/*
				System.out.print("\n IP: " + client.getIp());
				System.out.print("\n Application Name: " + obj.getName());
				System.out.print("\n Date Started: " +   Fecha  + " " + Hora);
				System.out.print("\n Page URL: " + client.getPageUrl() + "\n\n\n\n");
				System.out.print("\n Stream Name: " + streams.get(0));
				*/
				System.out.print("\n FIN EVENTO onConnectAccept \n\n\n");
			}

	public void onConnectReject(IClient client) {
		System.out.print("\n\n\n INICIO EVENTO onConnectReject \n");
		getLogger().info("onConnectReject: " + client.getClientId());
		System.out.print("\n FIN EVENTO onConnectReject \n\n\n");
		//System.out.print("-------------------------------------------------");
	}

	public void onDisconnect(IClient client) {
		System.out.print("\n\n\n INICIO Evento onDisconnect \n");
		getLogger().info("onDisconnect: " + client.getClientId());
			ConectarDesconectar(client, "out");
		System.out.print("\n FIN onDisconnect \n\n\n");
		//System.out.print("-------------------------------------------------");
	}

	public void onStreamCreate(IMediaStream stream) {
		System.out.print("\n\n\n INICIO Evento onStreamCreate \n");
		getLogger().info("onStreamCreate: " + stream.getSrc());
		System.out.print("\n FIN Evento onStreamCreate \n\n\n");
		//System.out.print("-------------------------------------------------");
	}

	public void onStreamDestroy(IMediaStream stream) {
		System.out.print("\n\n\n INICIO EVENTO onStreamDestroy \n");
		getLogger().info("onStreamDestroy: " + stream.getSrc());
		System.out.print("\n FIN EVENTO onStreamDestroy \n\n\n");
		//System.out.print("-------------------------------------------------");
	}
	
	public void ConectarDesconectar(IClient client, String IOtype) 
	{
		IApplication obj = client.getApplication();
		java.util.List streams = client.getAppInstance().getPublishStreamNames();
		int Conexiones = client.getAppInstance().getClientCount();
		if (IOtype == "out")
		{
			Conexiones--;
		}
		if (streams.isEmpty())
			{
				System.out.print("\n Stream Name: Encoder");  
			}
		else 
			{
				Calendar d = Calendar.getInstance();
				String dia = Integer.toString(d.get(Calendar.DATE));
				String mes = Integer.toString(d.get(Calendar.MONTH)+1);
				String annio = Integer.toString(d.get(Calendar.YEAR));
				String hora = Integer.toString(d.get(Calendar.HOUR_OF_DAY));
				String minuto = Integer.toString(d.get(Calendar.MINUTE));
				String segundos = Integer.toString(d.get(Calendar.SECOND));
				String Fecha = annio + "-" + mes + "-" + dia;
				String Hora = hora + ":" + minuto + ":" + segundos;
				
				String IP = client.getIp();
				String Aplicacion = obj.getName();
				String URL = client.getPageUrl();
				Object Stream = streams.get(0);
				
				String SQL = "INSERT INTO  Estadisticas1 (Id, Ip, Aplicacion, Stream, Fecha, Hora, Conexiones, IO, URL) VALUES (NULL ,  '" + IP + "',  '" + Aplicacion + "',  '" + Stream + "',  '" + Fecha + "',  '" + Hora+ "',  '" + Conexiones + "', '" + IOtype + "', '" + URL + "');";
				EjecutarSentencia(SQL);
			}
	}
	public void ReportarNodejs()
	{
		// Conectando a Nodejs
		System.out.print("\n\n\n LLAMANDO Nodejs \n"); 
		try
		 {
			 URL url = new URL("http://localhost:69");
		      URLConnection con = url.openConnection();
		      BufferedReader in = new BufferedReader(
   		           new InputStreamReader(con.getInputStream()));
		 }
		 catch (Exception e)
		 {
			 getLogger().error("Error llamando a Nodejs");
		 }
		 System.out.print("\n FIN LLAMADO \n\n\n");
	      
	      /*BufferedReader in = new BufferedReader(
	           new InputStreamReader(con.getInputStream()));*/

	   //Finaliza la conexión		
	}
	public void EjecutarSentencia(String SQL) 
	{
		// preload the driver class
		try 
		{
			Class.forName("com.mysql.jdbc.Driver").newInstance(); 
		} 
		catch (Exception e) 
		{ 
			getLogger().error("Error loading: com.mysql.jdbc.Driver: "+e.toString());
		} 
		
		Connection conn = null;
		try 
		{
			conn = DriverManager.getConnection("jdbc:mysql://192.168.69.1/bronco?user=root&password=");

			Statement stmt = null;
			ResultSet rs = null;

			try 
			{
				stmt = conn.createStatement();
				stmt.executeUpdate(SQL);
				ReportarNodejs();
					
				/*if (rs.next() == true)
				{
				    if (rs.getInt("userCount") > 0)
					{
						client.acceptConnection();
					}
				}*/
			} 
			catch (SQLException sqlEx) 
			{
				getLogger().error("sqlexecuteException: " + sqlEx.toString());
			} 
			finally 
			{
				// it is a good idea to release
				// resources in a finally{} block
				// in reverse-order of their creation
				// if they are no-longer needed

				if (rs != null) 
				{
					try 
					{
						rs.close();
					} 
					catch (SQLException sqlEx) 
					{

						rs = null;
					}
				}

				if (stmt != null) 
				{
					try 
					{
						stmt.close();
					} 
					catch (SQLException sqlEx) 
					{
						stmt = null;
					}
				}
			}

			conn.close();
		} 
		catch (SQLException ex) 
		{
			// handle any errors
			System.out.println("SQLException: " + ex.getMessage());
			System.out.println("SQLState: " + ex.getSQLState());
			System.out.println("VendorError: " + ex.getErrorCode());
		}
	}

}
